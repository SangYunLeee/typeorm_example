import { Controller, Get, Patch, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './entity/user.entitiy';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
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

  @Get('/posts')
  getPosts() {
    return this.postRepository.find({ relations: ['author', 'tags'] });
  }

  @Post('/posts/tags')
  async createPostAndTags() {
    const post1 = await this.postRepository.save({
      title: 'Javascript 강의',
      content: '자바스크립트 솰라솰라',
    });
    const post2 = await this.postRepository.save({
      title: 'NestJS 강의',
      content: 'NestJS 솰라솰라',
    });
    const tag1 = await this.tagRepository.save({
      name: '프로그래밍',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'NestJS',
      posts: [post2],
    });
    const post3 = await this.postRepository.save({
      title: 'Java 강의',
      content: 'Java 솰라솰라',
      tags: [tag1],
    });
    return true;
  }
}
