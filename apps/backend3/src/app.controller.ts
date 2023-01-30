import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Res,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('MyMicroservices') private readonly microServices: ClientKafka,
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
    });
    response.send('Mensaje emitido');
  }

  onModuleInit() {
    this.microServices.subscribeToResponseOf('UsersGetMessage');
  }
}
