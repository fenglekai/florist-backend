import { close, createApp } from '@midwayjs/mock';
import { UserService } from '../../src/service/user.service';
import { Framework, IMidwayKoaApplication } from '@midwayjs/koa';

describe('用户服务', () => {
  let app: IMidwayKoaApplication;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('登录', async () => {
    const userService = await app
      .createAnonymousContext()
      .requestContext.getAsync<UserService>(UserService);
    const result = await userService.login('test123', '123456');

    expect(result.uuid).not.toBeUndefined();
    expect(result.uuid).not.toBeNull();
  });

  it('查找用户', async () => {
    const userService = await app
      .createAnonymousContext()
      .requestContext.getAsync<UserService>(UserService);
    const result = await userService.findOne('1');
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });
});
