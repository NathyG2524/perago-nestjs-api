import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @ApiOperation({ description: 'Create role' })
  @ApiCreatedResponse({ type: Category })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ description: 'Get list of roles' })
  @ApiCreatedResponse({ type: Category })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ description: 'Get Tree of roles' })
  @ApiCreatedResponse({ type: Category })
  @Get("tree")
  findAllTrees() {
    return this.userService.findAllTree();
  }

  @ApiOperation({ description: 'Get role by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ description: 'Get role and all children of role in Tree' })
  @Get('/children/:id')
  findChildren(@Param('id') id: string) {
    return this.userService.findChildren(id);
  }

  @ApiOperation({ description: 'Update specific role' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ description: 'Delete Parent and all children' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
