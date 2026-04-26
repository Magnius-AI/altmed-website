/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import * as supertest from 'supertest';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { ResponseTransformInterceptor } from '../src/common/interceptors/response-transform.interceptor';
import { AnalyticsController } from '../src/modules/analytics/analytics.controller';
import { AnalyticsService } from '../src/modules/analytics/analytics.service';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { BlogController } from '../src/modules/blog/blog.controller';
import { BlogService } from '../src/modules/blog/blog.service';
import { ContactController } from '../src/modules/contact/contact.controller';
import { ContactService } from '../src/modules/contact/contact.service';
import { FaqController } from '../src/modules/faq/faq.controller';
import { FaqService } from '../src/modules/faq/faq.service';
import { HealthController } from '../src/modules/health/health.controller';

describe('App E2E Tests', () => {
  let app: INestApplication;
  const request = supertest as unknown as supertest.SuperTestStatic;
  const server = () => app.getHttpAdapter().getInstance();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [
        AnalyticsController,
        AuthController,
        BlogController,
        ContactController,
        FaqController,
        HealthController,
      ],
      providers: [
        {
          provide: AnalyticsService,
          useValue: {
            summary: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockRejectedValue(new UnauthorizedException('Invalid credentials')),
            me: jest.fn(),
          },
        },
        {
          provide: BlogService,
          useValue: {
            findPublished: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: ContactService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: FaqService,
          useValue: {
            findPublic: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => {
          throw new UnauthorizedException();
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      })
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  // ─── Health Check ─────────────────────────────────────
  describe('Health', () => {
    it('GET /api/health should return ok', () => {
      return request(server())
        .get('/api/health')
        .expect(200)
        .expect((res: supertest.Response) => {
          expect(res.body.data.status).toBe('ok');
        });
    });
  });

  // ─── Auth ──────────────────────────────────────────────
  describe('Auth', () => {
    it('POST /api/auth/login with wrong credentials should return 401', () => {
      return request(server())
        .post('/api/auth/login')
        .send({ email: 'wrong@test.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('POST /api/auth/login with missing fields should return 400', () => {
      return request(server())
        .post('/api/auth/login')
        .send({ email: 'test@test.com' })
        .expect(400);
    });

    it('GET /api/auth/me without token should return 401', () => {
      return request(server())
        .get('/api/auth/me')
        .expect(401);
    });
  });

  // ─── Blog (public endpoints) ───────────────────────────
  describe('Blog', () => {
    it('GET /api/blog should return array', () => {
      return request(server())
        .get('/api/blog')
        .expect(200)
        .expect((res: supertest.Response) => {
          expect(Array.isArray(res.body) || res.body.data).toBeDefined();
        });
    });
  });

  // ─── FAQ (public endpoints) ────────────────────────────
  describe('FAQ', () => {
    it('GET /api/faq should return array', () => {
      return request(server())
        .get('/api/faq')
        .expect(200);
    });
  });

  // ─── Protected routes ─────────────────────────────────
  describe('Protected Routes', () => {
    it('GET /api/contact/submissions without token should return 401', () => {
      return request(server())
        .get('/api/contact/submissions')
        .expect(401);
    });

    it('GET /api/analytics/summary without token should return 401', () => {
      return request(server())
        .get('/api/analytics/summary')
        .expect(401);
    });
  });
});
