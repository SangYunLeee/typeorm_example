import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entitiy';
import { CarModel } from './entity/inherit.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 30432,
      username: 'postgres',
      password: 'postgres',
      database: 'testdb',
      entities: [UserModel, CarModel, ProfileModel, PostModel, TagModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UserModel,
      CarModel,
      ProfileModel,
      PostModel,
      TagModel,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
