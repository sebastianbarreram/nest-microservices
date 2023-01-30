import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('UsersGetMessage')
  getHello(): { message: string } {
    console.log(`UsersGetMessage ${this.usersService.getHello()}`);
    return { message: this.usersService.getHello() };
  }
}
