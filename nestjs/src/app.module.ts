import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { Task } from './tasks/task.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        timezone: '+07:00',
        models: [Task, User], // Thêm các model vào đây
        autoLoadModels: true, // Tự động load model
        synchronize: true, // Đồng bộ schema (Không nên dùng trên môi trường production)
        pool: {
          max: configService.get('pool.max'),
          min: configService.get('pool.min'),
          acquire: configService.get('pool.acquire'),
          idle: configService.get('pool.idle')
        }
      }),
    }),
    TasksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
