import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 30432,
      username: 'postgres',
      password: 'postgres',
      database: 'testdb',
      entities: [UserModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}