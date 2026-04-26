/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from '../../database/entities';

// ─── Mock User Repository ───────────────────────────────
const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

// ─── Auth Service Tests ─────────────────────────────────
describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: jest.Mocked<Pick<JwtService, 'signAsync' | 'verifyAsync'>>;

  beforeEach(async () => {
    jwtService = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values: Record<string, string> = {
                'auth.jwtSecret': 'test_secret',
                'auth.jwtExpiresIn': '7d',
                'auth.refreshSecret': 'test_refresh_secret',
                'auth.refreshExpiresIn': '30d',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return tokens and user when credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        passwordHash: hashedPassword,
        role: 'admin',
        name: 'Test Admin',
        isActive: true,
      } as User;

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jwtService.signAsync
        .mockResolvedValueOnce('access_token')
        .mockResolvedValueOnce('refresh_token');

      const result = await authService.login({
        email: 'test@test.com',
        password: 'password123',
      });

      expect(result).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: {
          id: '1',
          email: 'test@test.com',
          role: 'admin',
          name: 'Test Admin',
        },
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });

    it('should throw when user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'notfound@test.com', password: 'password123' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw when password is wrong', async () => {
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      mockUserRepository.findOne.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        passwordHash: hashedPassword,
        isActive: true,
      } as User);

      await expect(
        authService.login({ email: 'test@test.com', password: 'wrongpassword' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw when user is inactive', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockUserRepository.findOne.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        passwordHash: hashedPassword,
        isActive: false,
      } as User);

      await expect(
        authService.login({ email: 'test@test.com', password: 'password123' })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('refresh', () => {
    it('should issue a new token pair for a valid refresh token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        role: 'admin',
        name: null,
        isActive: true,
      } as User;

      jwtService.verifyAsync.mockResolvedValue({
        sub: '1',
        email: 'test@test.com',
        role: 'admin',
        tokenType: 'refresh',
      });
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jwtService.signAsync
        .mockResolvedValueOnce('new_access_token')
        .mockResolvedValueOnce('new_refresh_token');

      const result = await authService.refresh('valid_refresh_token');

      expect(result.access_token).toBe('new_access_token');
      expect(result.refresh_token).toBe('new_refresh_token');
      expect(result.user.email).toBe('test@test.com');
    });

    it('should throw for an access token used as a refresh token', async () => {
      jwtService.verifyAsync.mockResolvedValue({
        sub: '1',
        email: 'test@test.com',
        role: 'admin',
        tokenType: 'access',
      });

      await expect(authService.refresh('access_token')).rejects.toThrow(
        'Invalid refresh token'
      );
    });
  });

  describe('me', () => {
    it('should return the current user by id', async () => {
      const mockUser = { id: '1', email: 'test@test.com' } as User;
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      await expect(authService.me('1')).resolves.toBe(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('changePassword', () => {
    it('should update the password when the current password is correct', async () => {
      const hashedPassword = await bcrypt.hash('oldpassword', 10);
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        passwordHash: hashedPassword,
      } as User;
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      await expect(
        authService.changePassword('1', {
          currentPassword: 'oldpassword',
          newPassword: 'newpassword',
        })
      ).resolves.toEqual({ success: true });

      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          passwordHash: expect.any(String),
        })
      );
      await expect(bcrypt.compare('newpassword', mockUser.passwordHash)).resolves.toBe(
        true
      );
    });
  });
});
