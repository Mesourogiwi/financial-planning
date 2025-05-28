import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateExpenseDto} from './dto/create-expense.dto'
import {UpdateExpenseDto} from './dto/update-expense.dto'
import {Expense, Prisma} from '../../generated/prisma'
import {PrismaService} from '../prisma.service'

@Injectable()
export class ExpensesService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createExpenseDto: CreateExpenseDto): Promise<Expense | null> {
        return await this.prisma.expense.create({data: createExpenseDto})
    }

    async findAll() {
        return await this.prisma.expense.findMany()
    }

    async findOne(id: string) {
        const expense = await this.prisma.expense.findUnique({where: {id}})

        if (!expense) {
            throw new NotFoundException(`Expense with id ${id} not found`)
        }
        return expense
    }

    async update(id: string, updateExpenseDto: UpdateExpenseDto) {
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
        const expense = await this.prisma.expense.findUnique({where: {id}})

        if (!expense) {
            throw new NotFoundException(`Expense with id ${id} not found`)
        }

        await this.prisma.expense.delete({where: {id}})
        return
    }
}
