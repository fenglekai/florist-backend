import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { GoodsService } from '../src/service/goods.service';

describe.only('test/db.test.ts', () => {
  it.only('db test', async () => {
    // create app
    const app = await createApp<Framework>();

    const service = await app
      .getApplicationContext()
      .getAsync<GoodsService>(GoodsService);
    const result = await service.find();

    // use expect by jest
    expect(result).not.toHaveLength(0);

    // close app
    await close(app);
  });
});
