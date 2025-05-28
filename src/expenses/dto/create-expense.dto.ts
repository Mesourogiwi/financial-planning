import {IsString, IsNumber, IsDate, IsNotEmpty} from 'class-validator'
import {Type} from 'class-transformer'

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date
}
