import { Controller, Get, Patch, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entity/user.entitiy';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers() {
    return this.userRepository.find({ relations: { profile: true } });
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

  // profile
  @Post('/users/profile') // create profile
  async createUserAndProfile(): Promise<UserModel> {
    const user = await this.userRepository.save({
      title: 'test title',
      name: { first: 'test', last: 'test' },
    });
    await this.profileRepository.save({
      user,
      age: 20,
    });
    return user;
  }
}
