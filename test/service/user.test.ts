import { close, createApp } from '@midwayjs/mock';
import { UserService } from '../../src/service/user.service';
import { Framework, IMidwayKoaApplication } from '@midwayjs/koa';

describe('UserService', () => {
  let app: IMidwayKoaApplication;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('user service login', async () => {
    const userService = await app
      .getApplicationContext()
      .getAsync<UserService>(UserService);
    const result = await userService.login('test123', '123456');

    expect(result.success).toEqual(true);
    expect(result.message).toEqual('OK');
  });
});
