import { Repository } from "typeorm";
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

    save(note: Category) {
        return this.cateRepo.save(note);
      }
    
}