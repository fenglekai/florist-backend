import { Provide, httpError } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Goods } from '../entity/goods.entity';
import { Category } from '../entity/category.entity';
import { StaticTable } from '../entity/staticTable.entity';
import { GoodsDTO } from '../dto/goods.dto';

@Provide()
export class GoodsService {
  // 注入实体模型，用于操作Goods实体
  @InjectEntityModel(Goods)
  goodsModel: Repository<Goods>;

  // 注入实体模型，用于操作Category实体
  @InjectEntityModel(Category)
  categoryModel: Repository<Category>;

  // 注入实体模型，用于操作StaticTable实体
  @InjectEntityModel(StaticTable)
  staticTableModel: Repository<StaticTable>;

  // 设置静态列表
  setStaticList(numberList: number[]): StaticTable[] {
    if (!numberList) return [];
    const staticList = [];
    for (let i = 0; i < numberList.length; i++) {
      const staticTable = new StaticTable();
      staticTable.id = numberList[i];
      staticList.push(staticTable);
    }
    return staticList;
  }

  // 设置商品关联实体
  setGoodsRelationEntity(goodsDTO: GoodsDTO) {
    const cate = new Category();
    cate.id = goodsDTO.cate;
    const staticList = this.setStaticList(goodsDTO.static_table);
    return { cate, static_table: staticList };
  }

  // 保存商品
  async add(goodsDTO: GoodsDTO) {
    const { cate, static_table } = this.setGoodsRelationEntity(goodsDTO);
    const goods = new Goods();
    goods.name = goodsDTO.name;
    goods.description = goodsDTO.description;
    goods.price = goodsDTO.price;
    goods.like_num = goodsDTO.like_num;
    goods.cate = cate;
    goods.static_table = static_table;
    const result = await this.goodsModel.save(goods);
    return result;
  }

  // 查询商品
  async find(query?: string) {
    const queryBuilder = this.goodsModel
      .createQueryBuilder('goods')
      .leftJoinAndSelect('goods.cate', 'cate')
      .leftJoinAndSelect('goods.static_table', 'static_table');

    if (query) {
      queryBuilder.where(
        `goods.name LIKE '%${query}%' OR goods.description LIKE '%${query}%'`
      );
    }

    const loadedGoods = await queryBuilder.getMany();
    return loadedGoods;
  }

  // 查询商品
  async findOne(id: number) {
    const result = this.goodsModel.findOne({
      relations: ['cate', 'static_table'],
      where: { id },
    });
    return result;
  }

  // 更新商品
  async update(id: number, goodsDTO: GoodsDTO) {
    const { cate, static_table } = this.setGoodsRelationEntity(goodsDTO);
    const findGoods = await this.goodsModel.findOne({ where: { id } });
    if (!findGoods) throw new httpError.BadRequestError('没有找到该商品');
    findGoods.name = goodsDTO.name;
    findGoods.description = goodsDTO.description;
    findGoods.price = goodsDTO.price;
    findGoods.like_num = goodsDTO.like_num;
    findGoods.cate = cate;
    findGoods.static_table = static_table;
    const result = await this.goodsModel.save(findGoods);
    return result;
  }

  // 删除商品
  async delete(id: number | number[]) {
    const result = await this.goodsModel.softDelete(id);
    return result;
  }

  // 查询已删除的商品
  async findDelete() {
    const result = await this.goodsModel
      .createQueryBuilder()
      .select()
      .withDeleted()
      .where('delete_time IS NOT NULL')
      .execute();
    return result;
  }

  // 恢复已删除的商品
  async restore(id: number | number[]) {
    const result = await this.goodsModel.restore(id);
    return result;
  }

  // TODO: 定时任务，超过规定天数定时清除数据
  async remove(id: number | number[]) {
    const result = await this.goodsModel.delete(id);
    return result;
  }

  // TODO:xlsx文件上传批量新增
  async batchAdd(goodsDTOs: GoodsDTO[]) {
    const toInertGoods = goodsDTOs.map(item => {
      const { cate, static_table } = this.setGoodsRelationEntity(item);
      return { ...item, cate, static_table };
    });
    const result = await this.goodsModel
      .createQueryBuilder()
      .insert()
      .into(Goods)
      .values(toInertGoods)
      .execute();
    return result;
  }
}
