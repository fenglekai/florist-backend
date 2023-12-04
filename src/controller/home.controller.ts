import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/', { ignoreGlobalPrefix: true })
  async home() {
    await this.ctx.render('index.nj', { user: 'midway' });
  }
}
