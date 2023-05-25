import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => User,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  user?: User;
}
