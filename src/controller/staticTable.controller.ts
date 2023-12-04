import {
  Body,
  Context,
  Controller,
  Del,
  Fields,
  Files,
  Get,
  Inject,
  Post,
  httpError,
} from '@midwayjs/core';
import { IdsDTO } from '../dto/goods.dto';
import { StaticTableService } from '../service/staticTable.service';
import { FileItem, UploadDTO } from '../dto/staticTable.dto';
import { ApiBody } from '@midwayjs/swagger';

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
    const res = await this.staticTableService.getPublicFiles();
    return { success: true, message: 'OK', data: res };
  }

  @Post('/upload')
  @ApiBody({ description: 'files' })
  @ApiBody({ description: 'fields', type: UploadDTO })
  async upload(@Files() files: FileItem[], @Fields() fields: UploadDTO) {
    if (!files.length) throw new httpError.BadRequestError('上传文件列表为空');
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      await this.staticTableService.addPublicFile(
        fields.user,
        item.filename,
        item.data
      );
    }
    return { success: true, message: 'OK' };
  }
}
