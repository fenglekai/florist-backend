import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Inject, Provide } from '@midwayjs/core';
import { user } from '../domain/user';
import { Clients } from '@midwayjs/grpc';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  grpcClients: Clients;

  async add(uuid: string, username: string) {
    const user = new User();
    user.uuid = uuid;
    user.username = username;
    user.login_num = 0;
    const result = await this.userModel.save(user);
    return result;
  }

  async find() {
    const result = await this.userModel.find();
    return result;
  }

  async findOne(uuid: string) {
    const result = await this.userModel.findOne({ where: { uuid } });
    return result;
  }

  async login(username: string, password: string) {
    const greeterService =
      this.grpcClients.getService<user.GreeterClient>('user.Greeter');
    const result = await greeterService.login().sendMessage({
      username,
      password,
    });
    const { userId, authorization } = result.data;
    let findUser = await this.findOne(userId);
    if (!findUser) {
      findUser = await this.add(userId, username);
    } else {
      findUser.login_num++;
      await this.userModel.save(findUser);
    }
    return { ...findUser, authorization };
  }

  async verify(code: string) {
    const greeterService =
      this.grpcClients.getService<user.GreeterClient>('user.Greeter');
    const result = await greeterService.verify().sendMessage({
      code,
    });
    return result;
  }
}
