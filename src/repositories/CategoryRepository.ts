import { Repository, FindOneOptions } from "typeorm";

import { Category } from "../entities/Category";
import { dataSource } from '../config/database';


export class CategoryRepository {
    private cateRepo: Repository<Category>;

    constructor() {
        this.cateRepo = dataSource.getRepository(Category);
    }

    findAll():Promise<Category[]> {
        return this.cateRepo.find();
    }
    create(data: Partial<Category>): Category {
        return this.cateRepo.create(data);
    }

    save(category: Category) {
        return this.cateRepo.save(category);
    }
    
    delete(id: number) {
        return this.cateRepo.delete(id);
    }
    
    findById(id: number) {
         return this.cateRepo.findOne({
          where: { id },
          relations: ['task'],
        });
    }

    findOne(options: FindOneOptions<Category>) {
        return this.cateRepo.findOne(options);
    }
    
    removeMany(categories: Category[]) {
        return this.cateRepo.remove(categories);
    }

    findByTaskId(taskId: number): Promise<Category[]> {
        return this.cateRepo.find({
          where: { task: { id: taskId } },
          relations: ['task'],
        });
    }
    
}
    