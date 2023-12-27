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

  async add(name: string) {
    const user = new User();
    user.username = name;
    const result = await this.userModel.save(user);
    return result;
  }

  async find() {
    const result = await this.userModel.find();
    return result;
  }

  async findOne(id: number) {
    const result = await this.userModel.findOne({ where: { id } });
    return result;
  }

  async login(username: string, password: string) {
    // 获取服务
    const greeterService =
      this.grpcClients.getService<user.GreeterClient>('user.Greeter');
    // 调用服务
    const result = await greeterService.login().sendMessage({
      username,
      password,
    });
    // 返回结果
    return result;
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
