import { Controller, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  KafkaRetriableException,
} from '@nestjs/microservices';
import { partition } from 'rxjs';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject('MyMicroservices') private readonly microServices: ClientKafka,
  ) {}

  @MessagePattern('PostsGetMessage')
  async getHello(
    data: { message: string },
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    console.log(this.postsService.getHello());
    // throw new HttpException('Daño', HttpStatus.BAD_REQUEST);

    // throw new KafkaRetriableException('error');
    // console.log(`PostsGetMessage: ${data.message}`);
    // const originalMessage = context.getMessage();
    // const topic = context.getTopic();
    // const partition = 1;
    // const { offset } = originalMessage;

    // await this.microServices.commitOffsets([{ topic, partition, offset }]);
  }
}
