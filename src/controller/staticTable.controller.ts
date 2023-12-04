import {
  App,
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
import { Application } from '@midwayjs/koa';
import fs = require('fs');
import { IdsDTO } from '../dto/goods.dto';
import { StaticTableService } from '../service/staticTable.service';
import { StaticTableDTO } from '../dto/staticTable.dto';

@Controller('/static')
export class StaticTableController {
  @Inject()
  ctx: Context;

  @Inject()
  staticTableService: StaticTableService;

  @App()
  app: Application;

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

  @Get('/publicList')
  async publicList() {
    try {
      const publicDir = this.app.getAppDir() + '/public';
      const res: string[] = await new Promise((resolve, reject) => {
        fs.readdir(publicDir, (err, files) => {
          if (err) {
            return reject('Unable to scan directory: ' + err);
          }
          resolve(files);
        });
      });
      return { success: true, message: 'OK', data: res };
    } catch (error) {
      console.error(error);
    }
  }
}
