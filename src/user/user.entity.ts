import { Post } from 'src/post/post.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Post, 
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  @JoinTable({
    name: 'user_posts',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
  })
  posts?: Post[];
}
