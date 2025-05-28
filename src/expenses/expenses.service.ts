import {Inject, Injectable, NotFoundException} from '@nestjs/common'
import {CreateExpenseDto} from './dto/create-expense.dto'
import {UpdateExpenseDto} from './dto/update-expense.dto'
import {Expense, Prisma} from '../../generated/prisma'
import {PrismaService} from '../prisma.service'
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Cache} from 'cache-manager'

type Filters = Partial<Pick<Prisma.ExpenseWhereInput, 'title' | 'category'>> & {
    month?: number
    year?: number
    minAmount?: number
    maxAmount?: number
}
@Injectable()
export class ExpensesService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}
    async create(createExpenseDto: CreateExpenseDto): Promise<Expense | null> {
        await this.cacheManager.clear()
        return await this.prisma.expense.create({data: createExpenseDto})
    }

    async findOne(id: string) {
        const cacheKey = `expense:${id}`
        const cached = await this.cacheManager.get<Expense>(cacheKey)
        if (cached) {
            return cached
        }

        const expense = await this.prisma.expense.findUnique({where: {id}})

        if (!expense) {
            throw new NotFoundException(`Expense with id ${id} not found`)
        }

        await this.cacheManager.set(cacheKey, expense)

        return expense
    }

    async findWithFilters(filters?: Filters) {
        const cacheKey = `expenses:${filters ? JSON.stringify(filters) : ''}`
        const cached = await this.cacheManager.get<Expense[]>(cacheKey)

        if (cached) {
            return cached
        }

        const expenses = await this.prisma.expense.findMany({
            where: {
                title: filters?.title,
                category: filters?.category,
                date: {
                    gte:
                        filters?.year || filters?.month
                            ? new Date(`${filters?.year}-${filters?.month}-01`)
                            : undefined,
                    lte:
                        filters?.year || filters?.month
                            ? new Date(`${filters?.year}-${filters?.month}-31`)
                            : undefined
                },
                amount: {
                    gte: filters?.minAmount ? Number(filters?.minAmount) : undefined,
                    lte: filters?.maxAmount ? Number(filters?.maxAmount) : undefined
                }
            }
        })

        await this.cacheManager.set(cacheKey, expenses)

        return expenses
    }

    async update(id: string, updateExpenseDto: UpdateExpenseDto) {
        await this.cacheManager.clear()
        const expense = await this.prisma.expense.findUnique({where: {id}})

        if (!expense) {
            throw new NotFoundException(`Expense with id ${id} not found`)
        }

        const updated = await this.prisma.expense.update({
            where: {id},
            data: updateExpenseDto
        })

        return updated
    }

    async remove(id: string) {
        await this.cacheManager.clear()
        const expense = await this.prisma.expense.findUnique({where: {id}})

        if (!expense) {
            throw new NotFoundException(`Expense with id ${id} not found`)
        }

        await this.prisma.expense.delete({where: {id}})
    }
}
