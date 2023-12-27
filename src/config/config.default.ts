import { MidwayConfig } from '@midwayjs/core';
// eslint-disable-next-line node/no-unpublished-import
import * as conf from './config.json';
import { DefaultUploadFileMimeType } from '@midwayjs/upload';
import { join } from 'path';

const userBaseDir = join(__dirname, '../../../florist-user');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1701049111314_566',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
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
        logging: false,
        timezone: '+08:00',
        dateStrings: true,
        entities: ['**/entity/*.entity{.ts,.js}'],
      },
    },
  },
  upload: {
    // 扩展名白名单
    whitelist: ['.jpg', '.jpeg', '.png', '.mp4'],
    // 仅允许下面这些文件类型可以上传
    mimeTypeWhiteList: DefaultUploadFileMimeType,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/api\/static\/upload/,
  },
  midwayLogger: {
    clients: {
      typeormLogger: {
        fileLogName: 'midway-typeorm.log',
        enableError: false,
        level: 'debug',
      },
    },
  },
  cors: {
    origin: (request: { header: { origin: string } }) => {
      const origin = request.header.origin;
      const whiteList = [
        'http://192.168.213.19:10086',
        'https://florist.devkai.site',
      ];
      if (whiteList.includes(origin)) {
        return origin;
      }
      return 'https://florist.devkai.site';
    },
  },
  jwt: {
    secret: 'midwayjs.florist', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
  },
  grpc: {
    services: [
      {
        url: 'localhost:6565',
        protoPath: join(userBaseDir, 'proto', 'user.proto'),
        package: 'user',
      },
    ],
  },
} as MidwayConfig;
