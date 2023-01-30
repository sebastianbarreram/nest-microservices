import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern('PostsGetMessage')
  getHello(data: { message: string }): void {
    console.log(this.postsService.getHello());
    console.log(`PostsGetMessage: ${data.message}`);
  }
}
