import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { GoodsService } from '../service/goods.service';

@Controller('/web')
export class WebController {
  // 注入上下文对象
  @Inject()
  ctx: Context;

  // 注入商品服务
  @Inject()
  goodsService: GoodsService;

  // 首页列表
  @Get('/homeList')
  async homeList(@Query('keyword') keyword: string) {
    const data = await this.goodsService.find(keyword);
    const res = data.map(item => {
      return {
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        like_num: item.like_num,
        src: item.static_table.length > 0 ? item.static_table[0].src : '',
      };
    });
    return { success: true, message: 'OK', data: res };
  }

  // 分类列表
  @Get('/cateList')
  async cateList() {
    const data = await this.goodsService.find();
    const res = data.map(item => {
      return {
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        like_num: item.like_num,
        cate: item.cate.name,
        src: item.static_table.length > 0 ? item.static_table[0].src : '',
      };
    });
    return { success: true, message: 'OK', data: res };
  }
}
