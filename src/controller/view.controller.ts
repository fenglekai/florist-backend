import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/view', { ignoreGlobalPrefix: true })
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/public')
  async render() {
    await this.ctx.render('publicFile.nj', { user: 'midway' });
  }
}
