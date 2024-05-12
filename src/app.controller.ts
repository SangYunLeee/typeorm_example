import { Controller, Get, Patch, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entity/user.entitiy';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers(): Promise<UserModel[]> {
    return this.userRepository.find();
  }
  @Post('/users')
  postUsers(): Promise<UserModel> {
    const user = new UserModel();
    user.title = 'test title';
    // user.content = 'test content';
    // user.likeCount = 0;
    // user.commentCount = 0;
    return this.userRepository.save(user);
  }

  @Patch('/users/:id')
  async patchUsers(@Param('id') id: string) {
    const post = await this.userRepository.findOne({ where: { id: +id } });
    post.title = post.title + '0';
    await this.userRepository.save(post);
    return post;
  }
}
