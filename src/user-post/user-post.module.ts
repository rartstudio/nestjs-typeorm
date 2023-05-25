import { Module } from '@nestjs/common';
import { UserPostController } from './user-post.controller';
import { UserPostService } from './user-post.service';

@Module({
  controllers: [UserPostController],
  providers: [UserPostService],
})
export class UserPostModule {}
