import { Module, CacheModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MyMicroservices',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9091'],
          },
        },
      },
    ]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost', //default host
      port: 6379, //default port
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
