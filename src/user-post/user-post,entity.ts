import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'user_posts' })
export class UserPosts {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'post_id' })
  postId: number;

  @ManyToOne(
    () => User,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(
    () => Post,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  posts: Post[];
}