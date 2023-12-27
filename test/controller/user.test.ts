import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, IMidwayKoaApplication } from '@midwayjs/koa';

describe('用户登录测试', () => {
  let app: IMidwayKoaApplication;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('短名称登录', async () => {
    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'test12',
      password: '123456',
    });

    // use expect by jest
    console.log(result.text);
    expect(result.status).toBe(500);
  });
  it('错误密码登录', async () => {
    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'test123',
      password: '1234567',
    });

    // use expect by jest
    console.log(result.text);
    expect(result.status).toBe(500);
  });
  let token = '';
  it('正常登录', async () => {
    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'test123',
      password: '123456',
    });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test123');
    expect(result.body.data.authorization).not.toBeUndefined();
    token = result.body.data.authorization;
  });
  it('效验登录', async () => {
    const result = await createHttpRequest(app).get('/api/user/verify').send({
      code: token,
    });
    
    // use expect by jest
    console.log(result.text);
    expect(result.status).toBe(200);
  });
});
