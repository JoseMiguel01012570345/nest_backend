import { BadRequestException, Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserhDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(
     @InjectModel( User.name ) 
    private userModel: Model<User>,
  
  ){}

  async create( CreateUserhDto:CreateUserhDto): Promise<User> {
    
    try
    {
      const { password , ...userData } = CreateUserhDto
      const newUser = new this.userModel({
        password :bcryptjs.hashSync( password , 10 ),

      });



      return await newUser.save();
  }
  catch (error) {
      
      if( error.code === 11000 )
        throw new BadRequestException( `${ CreateUserhDto.email } already exist ` )
      
      throw new InternalServerErrorException( 'Big crash')
      
    }
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
