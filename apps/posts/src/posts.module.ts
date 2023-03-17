import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MyMicroservices',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9091'],
            retry: {
              initialRetryTime: 5000,
              factor: 2,
              retries: 8,
            },
          },
          consumer: { groupId: 'ensayo' },
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
