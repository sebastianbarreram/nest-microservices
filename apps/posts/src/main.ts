import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PostsModule } from './posts.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9091'],
        },
        consumer: {
          groupId: 'posts-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Posts (microservices)... ');
}
bootstrap();
