import {PartialType} from '@nestjs/mapped-types'
import {CreateExpenseDto} from './create-expense.dto'
import {IsString, IsNumber, IsDate, IsOptional} from 'class-validator'
import {Type} from 'class-transformer'

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsNumber()
    amount?: number

    @IsOptional()
    @IsString()
    category?: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date?: Date
}
