import { Provide, httpError } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { StaticTable } from '../entity/staticTable.entity';

@Provide()
export class StaticTableService {
  @InjectEntityModel(StaticTable)
  staticTableModel: Repository<StaticTable>;

  async add(src: string) {
    const staticTable = new StaticTable();
    staticTable.src = src;
    const result = await this.staticTableModel.save(staticTable);
    return result;
  }

  async find() {
    const loadedStaticTable = await this.staticTableModel.find();
    return loadedStaticTable;
  }

  async update(id: number, src: string) {
    const findStaticTable = await this.staticTableModel.findOne({
      where: { id },
    });
    if (!findStaticTable) throw new httpError.BadRequestError('没有找到该资源');
    findStaticTable.src = src;
    const result = await this.staticTableModel.save(findStaticTable);
    return result;
  }

  async delete(id: number | number[]) {
    const result = await this.staticTableModel.softDelete(id);
    return result;
  }
}
