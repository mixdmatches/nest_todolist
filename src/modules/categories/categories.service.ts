import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * 分类服务类，处理任务分类相关的业务逻辑
 */
@Injectable()
export class CategoriesService {
  /**
   * 构造函数，注入分类实体的仓库
   * @param categoryRepository 分类实体仓库
   */
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * 创建新分类
   * @param id 用户ID
   * @param createCategoryDto 分类创建数据
   */
  create(id: number, createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save({ user_id: id, ...createCategoryDto });
  }

  /**
   * 获取指定用户的所有分类
   * @param id 用户ID
   * @returns 分类数组
   */
  async findAll(id: number) {
    return await this.categoryRepository.findBy({ user_id: id });
  }

  /**
   * 更新分类信息
   * @param id 分类ID
   * @param updateCategoryDto 分类更新数据
   */
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  /**
   * 删除分类
   * @param id 分类ID
   */
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
