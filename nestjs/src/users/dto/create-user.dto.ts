import { IsString, Length, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'firstName phải là chuỗi' })
    @Length(2, 50, { message: 'firstName phải có từ 2 đến 50 ký tự' })
    @IsNotEmpty({ message: 'Không được để trống tên' })
    firstName: string;

    @IsString({ message: 'lastName phải là chuỗi' })
    @IsOptional()
    @Length(2, 50, { message: 'lastName phải có từ 2 đến 50 ký tự' })
    lastName?: string;

    @IsOptional()
    isActive?: boolean;
}
