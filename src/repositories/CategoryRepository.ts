import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { dataSource } from '../config/database';


export class CategoryReposytory {
    private cateRepo: Repository<Category>;

    constructor() {
        this.cateRepo = dataSource.getRepository(Category);
    }

    findAll():Promise<Category[]> {
        return this.cateRepo.find();
      }
}