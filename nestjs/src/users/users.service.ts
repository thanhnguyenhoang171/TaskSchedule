import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto })
  }

}
