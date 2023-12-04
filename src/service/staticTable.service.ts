import { App, Provide, httpError } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '@midwayjs/koa';
import { StaticTable } from '../entity/staticTable.entity';
import fs = require('fs');

@Provide()
export class StaticTableService {
  @InjectEntityModel(StaticTable)
  staticTableModel: Repository<StaticTable>;

  @App()
  app: Application;

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
    if (id instanceof Array) {
      for (let i = 0; i < id.length; i++) {
        const itemId = id[i];
        const findStaticTable = await this.staticTableModel.findOne({
          where: { id: itemId },
        });
        if (!findStaticTable)
          throw new httpError.BadRequestError(itemId + '没有找到该资源');
        await this.deletePublicFile(findStaticTable.src);
      }
    } else {
      const findStaticTable = await this.staticTableModel.findOne({
        where: { id },
      });
      if (!findStaticTable)
        throw new httpError.BadRequestError(id + '没有找到该资源');
      await this.deletePublicFile(findStaticTable.src);
    }
    const result = await this.staticTableModel.delete(id);
    return result;
  }

  // 获取public文件夹路径
  getPublicPath() {
    return this.app.getAppDir() + '/public';
  }

  // 获取public文件列表
  async getPublicFiles() {
    const publicDir = this.getPublicPath();
    const res = await new Promise((resolve, reject) => {
      fs.readdir(publicDir, (err, files) => {
        if (err) {
          return reject('Unable to scan directory: ' + err);
        }
        resolve(files);
      });
    });
    return res;
  }

  // 添加public文件
  async addPublicFile(user: string, filename: string, filePath: string) {
    const toFile = this.getPublicPath() + `/${user}_${filename}`;
    fs.writeFileSync(toFile, fs.readFileSync(filePath));
    const src = `/public/${user}_${filename}`;
    await this.add(src);
  }

  // 删除public文件
  async deletePublicFile(filePath: string) {
    const file = this.app.getAppDir() + `/${filePath}`;
    await new Promise((resolve, reject) => {
      fs.unlink(file, err => {
        if (err) {
          return reject(err);
        }
        resolve('ok');
      });
    });
  }

  // TODO: 数据库资源与本地资源比对，清除多余数据
  async resourceSync() {}
}
