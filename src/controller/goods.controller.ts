import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { GoodsService } from '../service/goods.service';
import { GoodsDTO, IdsDTO } from '../dto/goods.dto';
import { ApiBearerAuth } from '@midwayjs/swagger';

@ApiBearerAuth()
@Controller('/goods')
export class GoodsController {
  // 注入上下文对象
  @Inject()
  ctx: Context;

  // 注入商品服务
  @Inject()
  goodsService: GoodsService;

  // 获取商品列表
  @Get('/list')
  async list() {
    const data = await this.goodsService.find();
    const res = data.map(item => {
      return {
        ...item,
        cate: item.cate.name,
        static_table: item.static_table.map(staticItem => staticItem.src),
      };
    });
    return { success: true, message: 'OK', data: res };
  }

  // 添加商品
  @Post('/add')
  async add(@Body() goodsDTO: GoodsDTO) {
    const res = await this.goodsService.add(goodsDTO);
    return { success: true, message: 'OK', data: res };
  }

  // 更新商品
  @Put('/update/:id')
  async update(@Body() goodsDTO: GoodsDTO, @Param('id') id: number) {
    const res = await this.goodsService.update(id, goodsDTO);
    return { success: true, message: 'OK', data: res };
  }

  // 删除商品
  @Del('/delete/:id')
  async delete(@Param('id') id: number) {
    await this.goodsService.delete(id);
    return { success: true, message: 'OK' };
  }

  // 批量删除商品
  @Del('/delete')
  async batchDelete(
    @Body()
    IdsDTO: IdsDTO
  ) {
    await this.goodsService.delete(IdsDTO.ids);
    return { success: true, message: 'OK' };
  }

  // 获取已删除的商品
  @Get('/deleteList')
  async deleteList() {
    const res = await this.goodsService.findDelete();
    return { success: true, message: 'OK', data: res };
  }

  // 恢复已删除的商品
  @Put('/restore/:id')
  async restore(@Param('id') id: number) {
    await this.goodsService.restore(id);
    return { success: true, message: 'OK' };
  }

  // 恢复已删除的商品
  @Put('/restore')
  async batchRestore(@Body() IdsDTO: IdsDTO) {
    await this.goodsService.restore(IdsDTO.ids);
    return { success: true, message: 'OK' };
  }
}
