import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { SerializedUser, User } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [
    { id: 1, username: 'eaobesegun', password: 'abode' },
    { id: 2, username: 'tolulope', password: 'tolu' },
    { id: 3, username: 'adebayo', password: 'ade' },
  ];

  getUsers(): User[] {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }
}
