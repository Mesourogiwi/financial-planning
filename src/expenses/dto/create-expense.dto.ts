import {IsString, IsNumber, IsDate, IsNotEmpty} from 'class-validator'
import {Type} from 'class-transformer'
import {ApiProperty} from '@nestjs/swagger'

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Título da despesa',
        example: 'Contas',
        required: true,
        type: String
    })
    title: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'Quantia da despesa',
        example: 200,
        required: true,
        type: Number
    })
    amount: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Categoria da despesa',
        example: 'Lazer',
        required: true,
        type: String
    })
    category: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @ApiProperty({
        description: 'Data da despesa',
        example: '2025-05-28',
        required: true,
        type: Date
    })
    date: Date
}
