/**
 * 定义了一个自定义装饰器 @Public()，用于标记某些路由为“公开”，通常配合守卫（如 JWT 鉴权）使用，表示这些接口不需要认证即可访问
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
