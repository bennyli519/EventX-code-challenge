import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { RedisService } from '../src/redis/services/redis.service';
import { AppModule } from '../src/app.module';

describe('IdentityController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
    await app.get(RedisService).client.flushAll();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/identity (GET)', () => {
    return request(app.getHttpServer()).get('/currency').expect(HttpStatus.OK);
  });
});
