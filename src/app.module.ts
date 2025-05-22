// nest基础配置和TypeOrm模块
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// 用户相关模块
import { UsersModule } from './modules/users/users.module';
import { User } from 'src/modules/users/entities/user.entity';

// 任务相关模块
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from 'src/modules/tasks/entities/task.entity';

// 分类相关模块
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from 'src/modules/categories/entities/category.entity';

// 用户鉴权相关模块
import { AuthModule } from './modules/auth/auth.module';

// 响应拦截器
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '230203',
      database: 'todolist',
      entities: [User, Task, Category],
      synchronize: false,
    }),
    TasksModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
