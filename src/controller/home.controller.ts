import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/', { ignoreGlobalPrefix: true })
  async home(): Promise<string> {
    return '<html>Hello Midwayjs!<br />Swagger path: <a target="_blank" href="http://127.0.0.1:7001/swagger-ui/index.html">http://127.0.0.1:7001/swagger-ui/index.html</a> <br />staticFile: <a target="_blank" href="http://127.0.0.1:7001/public/index.html">http://127.0.0.1:7001/public/index.html</a></html>';
  }
}
