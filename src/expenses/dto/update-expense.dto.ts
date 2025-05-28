import {PartialType} from '@nestjs/mapped-types'
import {CreateExpenseDto} from './create-expense.dto'
import {IsString, IsNumber, IsDate, IsOptional} from 'class-validator'
import {Type} from 'class-transformer'
import {ApiProperty} from '@nestjs/swagger'

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Título da despesa',
        example: 'Contas',
        required: false,
        type: String
    })
    title?: string

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'Quantia da despesa',
        example: 200,
        required: false,
        type: Number
    })
    amount?: number

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Categoria da despesa',
        example: 'Lazer',
        required: false,
        type: String
    })
    category?: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        description: 'Data da despesa',
        example: '2025-05-28',
        required: false,
        type: Date
    })
    date?: Date
}
