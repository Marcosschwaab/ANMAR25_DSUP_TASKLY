import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { Task } from './Task';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 155 })
  name: string;

  @ManyToOne(() => Task, task => task.categories)
  task: Task;

  @CreateDateColumn()
  created_at: Date;

}