import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/', { ignoreGlobalPrefix: true })
  async home(): Promise<string> {
    return 'Hello Midwayjs!\nSwagger path: http://127.0.0.1:7001/swagger-ui/index.html';
  }
}
