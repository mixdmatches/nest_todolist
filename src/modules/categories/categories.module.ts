import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // 导入其他模块，如 TypeOrmModule 用于数据库访问
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
