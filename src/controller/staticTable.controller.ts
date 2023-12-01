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
import { IdsDTO } from '../dto/goods.dto';
import { StaticTableService } from '../service/staticTable.service';
import { StaticTableDTO } from '../dto/staticTable.dto';

@Controller('/static')
export class StaticTableController {
  @Inject()
  ctx: Context;

  @Inject()
  staticTableService: StaticTableService;

  @Get('/list')
  async list() {
    const res = await this.staticTableService.find();
    return { success: true, message: 'OK', data: res };
  }

  @Post('/add')
  async add(@Body() staticDTO: StaticTableDTO) {
    const res = await this.staticTableService.add(staticDTO.src);
    return res;
  }

  @Put('/update/:id')
  async update(@Body() staticDTO: StaticTableDTO, @Param('id') id: number) {
    const res = await this.staticTableService.update(id, staticDTO.src);
    return { success: true, message: 'OK', data: res };
  }

  @Del('/delete')
  async delete(
    @Body()
    IdsDTO: IdsDTO
  ) {
    await this.staticTableService.delete(IdsDTO.ids);
    return { success: true, message: 'OK' };
  }
}
