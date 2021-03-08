import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  DeployRoleDto,
  changePwdDto,
  QueryUserDto,
} from './user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() cto: CreateUserDto) {
    return this.userService.create(cto);
  }

  @Get('getById')
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(@Query() id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post('changePwd')
  async changePwd(@Body() changePDto: changePwdDto) {
    return this.userService.changePwd(changePDto);
  }

  @Get('getUserList')
  async getList(@Query() qto: QueryUserDto) {
    return this.userService.findListAndCount(qto);
  }

  @Post('deployRole')
  async deployRole(@Body() deployDto: DeployRoleDto) {
    return this.userService.deployRole(deployDto);
  }
}
