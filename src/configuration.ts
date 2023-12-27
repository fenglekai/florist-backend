import { Configuration, App, ILifeCycle } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as view from '@midwayjs/view-nunjucks';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as staticFile from '@midwayjs/static-file';
import * as upload from '@midwayjs/upload';
import * as crossDomain from '@midwayjs/cross-domain';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import * as grpc from '@midwayjs/grpc';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import { BadRequestFilter } from './filter/badrequest';
import { UnauthorizedFilter } from './filter/unauthorize.filter';

@Configuration({
  imports: [
    koa,
    validate,
    view,
    orm,
    staticFile,
    upload,
    crossDomain,
    jwt,
    passport,
    grpc,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtPassportMiddleware]);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      DefaultErrorFilter,
      BadRequestFilter,
      UnauthorizedFilter,
    ]);
  }
}
