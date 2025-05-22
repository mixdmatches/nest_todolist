import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * 分类控制器，处理任务分类相关的路由请求
 */
@ApiTags('任务分类模块')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * 创建分类接口
   * @param createCategoryDto 分类创建数据
   * @param request 请求对象（用于获取用户信息）
   */
  @ApiOperation({ summary: '创建分类' })
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: Request,
  ) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.categoriesService.create(user.sub, createCategoryDto);
  }

  /**
   * 获取分类列表接口
   * @param request 请求对象（用于获取用户信息）
   */
  @ApiOperation({ summary: '获取分类列表' })
  @Get()
  findAll(@Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.categoriesService.findAll(user.sub);
  }

  /**
   * 更新分类接口
   * @param id 分类ID
   * @param updateCategoryDto 分类更新数据
   */
  @ApiOperation({ summary: '更新分类' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  /**
   * 删除分类接口
   * @param id 分类ID
   */
  @ApiOperation({ summary: '删除分类' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
