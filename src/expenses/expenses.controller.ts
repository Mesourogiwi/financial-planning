import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards} from '@nestjs/common'
import {ExpensesService} from './expenses.service'
import {CreateExpenseDto} from './dto/create-expense.dto'
import {UpdateExpenseDto} from './dto/update-expense.dto'
import {ApiBearerAuth, ApiQuery} from '@nestjs/swagger'
import {AuthGuard} from '../auth/auth.guard'

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto) {
        return this.expensesService.create(createExpenseDto)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    @ApiQuery({name: 'title', required: false, type: String})
    @ApiQuery({name: 'category', required: false, type: String})
    @ApiQuery({name: 'month', required: false, type: Number})
    @ApiQuery({name: 'year', required: false, type: Number})
    @ApiQuery({name: 'minAmount', required: false, type: Number})
    @ApiQuery({name: 'maxAmount', required: false, type: Number})
    findWithFilters(
        @Query('title') title?: string,
        @Query('category') category?: string,
        @Query('month') month?: number,
        @Query('year') year?: number,
        @Query('minAmount') minAmount?: number,
        @Query('maxAmount') maxAmount?: number
    ) {
        return this.expensesService.findWithFilters({
            title,
            category,
            month,
            year,
            minAmount,
            maxAmount
        })
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expensesService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        return this.expensesService.update(id, updateExpenseDto)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expensesService.remove(id)
    }
}
