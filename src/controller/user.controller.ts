import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('/user')
export class UserController {
  // 注入上下文对象
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() user: UserDTO) {
    const { username, password } = user;
    const data = this.userService.login(username, password);
    return data;
  }

  @Get('/verify')
  async verify(@Query('code') code: string) {
    const data = this.userService.verify(code);
    return data;
  }
}
