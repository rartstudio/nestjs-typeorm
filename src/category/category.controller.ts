import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryResponse } from './category.response';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller({
  path: 'categories',
  version: '1',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  @HttpCode(200)
  async getCategories() {
    const users: Category[] = await this.categoryService.getCategories();

    const result = users.map(
      (category: Category) => new CategoryResponse(category),
    );

    return { message: 'Success get categories', status: true, data: result };
  }

  @Post('')
  @HttpCode(201)
  async postCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category: Category = await this.categoryService.createCategory(
      createCategoryDto,
    );

    const result = new CategoryResponse(category);

    return { message: 'Success create category', status: true, data: result };
  }

  @Put(':id')
  @HttpCode(200)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const category: Category = await this.categoryService.updateCategory(updateCategoryDto, id);

    const result = new CategoryResponse(category);

    return { message: 'Success update category', status: true, data: result};
  }
}
