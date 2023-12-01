import { Provide, httpError } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';

@Provide()
export class CategoryService {
  @InjectEntityModel(Category)
  categoryModel: Repository<Category>;

  async add(name: string) {
    const category = new Category();
    category.name = name;
    const result = await this.categoryModel.save(category);
    return result;
  }

  async find() {
    const loadedCategory = await this.categoryModel.find();
    return loadedCategory;
  }

  async update(id: number, name: string) {
    const findCategory = await this.categoryModel.findOne({ where: { id } });
    if (!findCategory) throw new httpError.BadRequestError('没有找到该分类');
    findCategory.name = name;
    const result = await this.categoryModel.save(findCategory);
    return result;
  }

  async delete(id: number | number[]) {
    const result = await this.categoryModel.softDelete(id);
    return result;
  }
}
