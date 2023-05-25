import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return await this.categoryRepository.save(createCategoryDto);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, id: number): Promise<Category> {
    const category = new Category();
    category.name = updateCategoryDto.name;
    await this.categoryRepository.update({ id }, category);
    return await this.categoryRepository.findOneBy({id});
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.delete({id});
  }
}
