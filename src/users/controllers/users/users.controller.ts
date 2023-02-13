import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { SerializedUser } from 'src/users/services/users/types';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/id/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException();
  }
}
