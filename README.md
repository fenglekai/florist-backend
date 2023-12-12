# florist-backend

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

启动前请确认`/src/config/config.json`存在，可以参考配置`/src/config/config.example.json`

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

- UI: http://127.0.0.1:7001/swagger-ui/index.html
- JSON: http://127.0.0.1:7001/swagger-ui/index.json

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.


[midway]: https://midwayjs.org

### Use Plugin

- @midwayjs/swagger 接口调试
- @midwayjs/typeorm 对象映射模型
- @midwayjs/validate 效验字段
- @midwayjs/static-file 静态文件托管
- @midwayjs/upload 文件上传
- @midwayjs/view-nunjucks 模板渲染
- @midwayjs/cross-domain 跨域
- @midwayjs/jwt 令牌
- @midwayjs/passport 身份验证
