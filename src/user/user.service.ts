import { HttpException, HttpStatus, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/user.entity';
import {  TreeRepository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(Category)
  private readonly userRepository: TreeRepository<Category>;  
  async findAll() {
    return  this.userRepository.find()
  }

  async findAllTree() {
    return  this.userRepository.findTrees()
  }

  async findOne(@Param('id') id: string)  {
    const trees = await this.userRepository.findTrees()
    return this.userRepository.createQueryBuilder("Category")
    .where("Category.id = :id", { id: id })
    .getOne()
}

async findChildren(@Param('id') id:string) {
  const parentCategory =  await this.userRepository.createQueryBuilder("Category")
  .where("Category.id = :id", { id: id })
  .getOne()
  return this.userRepository.findDescendants(parentCategory)
}
  async create(body: CreateUserDto) : Promise<Category> {
    const user: Category =  new Category();
    const parent = await this.findOne(body.parentId);
    user.name = body.name;
    user.description = body.description;
    user.parent  = parent

    return this.userRepository.save(user);
  }

  async update(id: string, body: UpdateUserDto) : Promise<Category> {

    await this.userRepository.update(id, body)
    const user: Category=  await this.userRepository.findOneBy({ id })
    if ( user) {
      return user;

    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async remove(id: string) {
    const deleteduser =  await this.userRepository.createQueryBuilder('Category')
    .delete()
    .where("id = :id", { id: id })
    .execute();
    if(!deleteduser.affected){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
