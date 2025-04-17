import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from 'src/modules/categories/entities/category.entity';
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
