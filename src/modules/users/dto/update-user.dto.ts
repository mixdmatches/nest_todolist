import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: '用户名长度不能少于 6 位' })
  @MaxLength(12, { message: '用户名长度不能超过 12 位' })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: '密码长度不能少于 6 位' })
  @MaxLength(12, { message: '密码长度不能超过 12 位' })
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  status?: number;
}
