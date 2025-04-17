import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: '用户长度不能少于 6 位' })
  @MaxLength(12, { message: '用户长度不能超过 12 位' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: '密码长度不能少于 6 位' })
  @MaxLength(12, { message: '密码长度不能超过 12 位' })
  password: string;
}
