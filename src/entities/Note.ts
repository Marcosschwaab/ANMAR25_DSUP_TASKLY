import { ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert} from 'typeorm';
import { Task } from './Task';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  content: string;

  @ManyToOne(() => Task, task => task.notes)
  task: Task;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date | null;

  @BeforeInsert()
  preventUpdatedAtOnInsert() {
    this.updated_at = null;
  }
}