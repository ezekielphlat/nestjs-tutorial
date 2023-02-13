import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from './types';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id:1, username: 'eaobesegun', password: 'abode' },
    { id:2,username: 'tolulope', password: 'tolu' },
    { id:3,username: 'adebayo', password: 'ade' },
  ];

  getUsers(): User[] {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }
  getUserById(id:number){
    return this.users.find(user => user.id === id)
  }
}
