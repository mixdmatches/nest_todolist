import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdTaskId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // 注册并登录获取token（假设有注册和登录接口）
    const username = 'testuser';
    const password = 'testpass';
    await request(app.getHttpServer())
      .post('/users/register')
      .send({ username, password });
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username, password });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    jwtToken = loginRes.body.data?.access_token || loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('创建任务', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: '测试任务',
        content: '任务内容',
        category_id: 1,
        tag_id: 1,
        finish_time: new Date(),
        status: 0,
        level: 1,
      });
    expect(res.status).toBe(201);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    createdTaskId = res.body.data?.id || 1;
  });

  it('获取任务列表', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('获取任务详情', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', createdTaskId);
  });

  it('更新任务', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: '更新后的任务标题' });
    expect(res.status).toBe(200);
  });

  it('删除任务', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
  });
});
