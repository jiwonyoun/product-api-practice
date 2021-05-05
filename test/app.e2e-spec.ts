import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // default: beforeEach 를 beforeAll 로 수정!!
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 요소가 아닌 요청값들은 Validator에 도착하지 않음
        forbidNonWhitelisted: true, // 에러 메시지에 잘못된 요소 출력 (400)
        transform: true, // 요청ㄹ값들을 실제 타입으로 변환 (원래 url은 string -> number)
      }),
    );
    await app.init();
  });

  describe('/product', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/product').expect(200);
    });
  });

  it('POST 201', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'test',
        price: 1111,
      })
      .expect(201);
  });

  it('POST 400', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'test',
        price: 1111,
        other: 'thing', // 잘못된 요소 요청
      })
      .expect(400);
  });

  it('DELETE', () => {
    return request(app.getHttpServer()).delete('/product').expect(404); // NOT FOUND http code
  });

  describe('/product/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/product/4').expect(200);
    });
  });
  it.todo('DELETE');
  it.todo('PATCH');

  describe('/product/:id', () => {
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/productssss/5').expect(404); // 잘못된 url 요청
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/product/5')
        .send({
          name: 'changed',
          price: 2222,
        })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/product/7').expect(200);
    });
  });
});
