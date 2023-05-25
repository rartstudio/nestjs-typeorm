import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserResponse } from './user.response';

@Controller({
  path: 'users',
  version: '1',
})
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @HttpCode(200)
  async getUsers() {
    const users: User[] = await this.userService.getUsers();

    const result = users.map((user: User) => new UserResponse(user));

    return { message: 'Success get users', status: true, data: result };
  }

  @Post('')
  @HttpCode(201)
  async postUser(@Body() createUserDto: CreateUserDto) {
    const user: User = await this.userService.createUser(createUserDto);

    return { data: user, message: 'Success create user' };
  }
}
