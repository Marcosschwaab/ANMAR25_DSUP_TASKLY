import { Repository } from 'typeorm';
import { Note } from '../entities/Note';
import { dataSource } from '../config/database';

export class NoteRepository {
  private repository: Repository<Note>;

  constructor() {
    this.repository = dataSource.getRepository(Note);
  }

  findByTaskId(taskId: number) {
    return this.repository.find({
      where: { task: { id: taskId } },
      relations: ['task'],
    });
  }

  create(data: Partial<Note>) {
    return this.repository.create(data);
  }

  save(note: Note) {
    return this.repository.save(note);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['task'],
    });
  }

  removeMany(notes: Note[]) {
    return this.repository.remove(notes);
  }
}
