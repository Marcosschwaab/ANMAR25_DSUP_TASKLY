import { Repository } from 'typeorm';
import { Note } from '../entities/Note';
import { dataSource } from '../config/database';

export class NoteRepository {
  private noteRepo: Repository<Note>;

  constructor() {
    this.noteRepo = dataSource.getRepository(Note);
  }

  findByTaskId(taskId: number) {
    return this.noteRepo.find({
      where: { task: { id: taskId } },
      relations: ['task'],
    });
  }

  create(data: Partial<Note>) {
    return this.noteRepo.create(data);
  }

  save(note: Note) {
    return this.noteRepo.save(note);
  }

  delete(id: number) {
    return this.noteRepo.delete(id);
  }

  findById(id: number) {
    return this.noteRepo.findOne({
      where: { id },
      relations: ['task'],
    });
  }

  removeMany(notes: Note[]) {
    return this.noteRepo.remove(notes);
  }
}
