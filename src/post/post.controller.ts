import { Controller } from '@nestjs/common';

@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  // constructor(private categoryService: CategoryService) {}

  // @Get('')
  // @HttpCode(200)
  // async getCategories() {
  //   const users: Category[] = await this.categoryService.getCategories();

  //   const result = users.map(
  //     (category: Category) => new CategoryResponse(category),
  //   );

  //   return { message: 'Success get categories', status: true, data: result };
  // }

  // @Post('')
  // @HttpCode(201)
  // async postUser(@Body() createCategoryDto: CreateCategoryDto) {
  //   const category: Category = await this.categoryService.createCategories(
  //     createCategoryDto,
  //   );

  //   const result = new CategoryResponse(category);

  //   return { message: 'Success create category', status: true, data: result };
  // }
}
