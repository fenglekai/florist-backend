import { MidwayConfig } from '@midwayjs/core';
// eslint-disable-next-line node/no-unpublished-import
import * as conf from './config.json';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1701049111314_566',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mariadb',
        host: conf['host'],
        port: conf['port'],
        username: conf['username'],
        password: conf['password'],
        database: conf['database'],
        // 第一次同步true,注意会数据丢失
        synchronize: true,
        logging: true,
        timezone: '+08:00',
        dateStrings: true,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
