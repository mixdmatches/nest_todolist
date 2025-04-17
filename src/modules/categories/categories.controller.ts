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

@ApiTags('任务分类模块')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '创建分类' })
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() request: Request,
  ) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.categoriesService.create(user.sub, createCategoryDto);
  }

  @ApiOperation({ summary: '获取分类列表' })
  @Get()
  findAll(@Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.categoriesService.findAll(user.sub);
  }

  @ApiOperation({ summary: '更新分类' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: '删除分类' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
