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
    const result = await service.save({
      name: 'string',
      description: 'string',
      price: 0,
      like_num: 0,
      cate: 1,
      static_table: [1],
    });
    console.log(result);

    // use expect by jest
    expect(result).toReturn();

    // close app
    await close(app);
  });
});

// describe('GoodsService', async () => {
//   const app = await createApp<Framework>();
//   let goodsService = await app
//   .getApplicationContext()
//   .getAsync<GoodsService>(GoodsService);

//  it('should call save method', async () => {
//    const goodsDTO = {
//      name: 'test',
//      description: 'test',
//      price: 1,
//      like_num: 1,
//      cate: 1,
//      static_table: [1, 2, 3],
//    };
//    const result = await goodsService.save(goodsDTO);
//    expect(result).toBeDefined();
//  });

//  it('should call find method', async () => {
//    const result = await goodsService.find();
//    expect(result).toBeDefined();
//  });

//  it('should call update method', async () => {
//    const goodsDTO = {
//      name: 'test',
//      description: 'test',
//      price: 1,
//      like_num: 1,
//      cate: 1,
//      static_table: [1, 2, 3],
//    };
//    const id = 1;
//    const result = await goodsService.update(goodsDTO, id);
//    expect(result).toBeDefined();
//  });

//  it('should call delete method', async () => {
//    const id = 1;
//    const result = await goodsService.delete(id);
//    expect(result).toBeDefined();
//  });

//  it('should call restore method', async () => {
//    const id = 1;
//    const result = await goodsService.restore(id);
//    expect(result).toBeDefined();
//  });

//  it('should call remove method', async () => {
//    const id = 1;
//    const result = await goodsService.remove(id);
//    expect(result).toBeDefined();
//  });

//  it('should call batchAdd method', async () => {
//    const goodsDTOs = [
//      {
//        name: 'test',
//        description: 'test',
//        price: 1,
//        like_num: 1,
//        cate: 1,
//        static_table: [1, 2, 3],
//      },
//    ];
//    const result = await goodsService.batchAdd(goodsDTOs);
//    expect(result).toBeDefined();
//  });

//  it('should call batchUpdate method', async () => {
//    const goodsDTOs = [
//      {
//        id: 1,
//        name: 'test',
//        description: 'test',
//        price: 1,
//        like_num: 1,
//        cate: 1,
//        static_table: [1, 2, 3],
//      },
//    ];
//    const result = await goodsService.batchUpdate(goodsDTOs);
//    expect(result).toBeDefined();
//  });
// });