import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Note } from './Note';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'enum', enum: ['todo', 'in_progress', 'done'], default: 'todo' })
    status: 'todo' | 'in_progress' | 'done';

    @Column({
      type: 'enum',
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    })
    priority: 'low' | 'medium' | 'high' | 'critical';
    

    @OneToMany(() => Note, note => note.task)
    notes: Note[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date | null;
  
    @BeforeInsert()
    preventUpdatedAtOnInsert() {
      this.updated_at = null;
    }
}
