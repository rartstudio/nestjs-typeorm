import { Exclude } from 'class-transformer';

export class CategoryResponse {
  id: number;

  name: string;

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}
