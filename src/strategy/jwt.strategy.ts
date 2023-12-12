import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from '@midwayjs/core';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig: { secret: any };

  async validate(payload: any) {
    return payload;
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }

  serializeUser(user: any, done: (arg0: null, arg1: any) => void) {
    // 可以只保存用户名
    done(null, user);
  }

  deserializeUser(id: any, done: (arg0: null, arg1: any) => void) {
    // 这里不是异步方法，你可以从其他地方根据用户名，反查用户数据。
    // const user = getUserFromDataBase(id);

    done(null, id);
  }
}
