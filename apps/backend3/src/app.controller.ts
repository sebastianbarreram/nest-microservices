import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Res,
  CACHE_MANAGER,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { Cache } from 'cache-manager';

@Controller()
export class AppController implements OnModuleInit {
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(
    @Inject('MyMicroservices') private readonly microServices: ClientKafka,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('users')
  getHelloUsers(@Res() response: Response): void {
    this.microServices
      .send<{ message: string }>('UsersGetMessage', {})
      .subscribe({
        next: (data) => {
          response.json(data);
        },
      });
  }

  @Post('posts')
  getHelloPosts(@Res() response: Response): void {
    this.microServices.emit('PostsGetMessage', {
      message: 'Hola Mundo para el Post',
      RS: {
        name: 'Sebastian',
        code: 123456789,
      },
      RQ: {
        transactionType: '2',
        amount: 1000,
      },
      CFO: {
        id: '1234-123456-789456123',
        externalId: '0000-000000-789456456',
      },
    });
    response.send('Mensaje emitido');
  }

  onModuleInit() {
    this.microServices.subscribeToResponseOf('UsersGetMessage');
  }

  @Get('get-number-cache')
  async getNumber(): Promise<any> {
    const val = await this.cacheManager.get('number');
    if (val) {
      return {
        data: val,
        FromRedis: 'this is loaded from redis cache',
      };
    }

    if (!val) {
      await this.cacheManager.set('number', this.randomNumDbs, { ttl: 30 });
      return {
        data: this.randomNumDbs,
        FromRandomNumDbs: 'this is loaded from randomNumDbs',
      };
    }
  }
}
