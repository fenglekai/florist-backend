import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiExcludeController } from '@midwayjs/swagger';

@ApiExcludeController()
@Controller('/home')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/base', { ignoreGlobalPrefix: true })
  async home() {
    await this.ctx.render('index.nj', { user: 'midway' });
  }
}
