import { Exclude } from 'class-transformer';

export class UserResponse {
  id: number;
  
  name: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}