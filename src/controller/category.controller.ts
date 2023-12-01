import {
  Body,
  Context,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@midwayjs/core';
import { CategoryService } from '../service/category.service';
import { IdsDTO } from '../dto/goods.dto';
import { CategoryDTO } from '../dto/category.dto';

@Controller('/cate')
export class CategoryController {
  @Inject()
  ctx: Context;

  @Inject()
  categoryService: CategoryService;

  @Get('/list')
  async list() {
    const res = await this.categoryService.find();
    return { success: true, message: 'OK', data: res };
  }

  @Post('/add')
  async add(@Body() cateDTO: CategoryDTO) {
    const res = await this.categoryService.add(cateDTO.name);
    return res;
  }

  @Put('/update/:id')
  async update(@Body() cateDTO: CategoryDTO, @Param('id') id: number) {
    const res = await this.categoryService.update(id, cateDTO.name);
    return { success: true, message: 'OK', data: res };
  }

  @Del('/delete')
  async delete(
    @Body()
    IdsDTO: IdsDTO
  ) {
    await this.categoryService.delete(IdsDTO.ids);
    return { success: true, message: 'OK' };
  }
}
