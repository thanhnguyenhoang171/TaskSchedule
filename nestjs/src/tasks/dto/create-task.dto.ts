import { IsString, Length, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsString({ message: 'Task tittle must be a string' })
    @Length(2, 50, { message: 'Task title must be between 2 and 50 characters length' })
    @IsNotEmpty({ message: 'Task title is not empty' })
    title: string;

    @IsOptional()
    isCompleted?: number;
}
