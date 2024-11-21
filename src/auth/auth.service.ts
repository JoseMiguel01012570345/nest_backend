import { BadRequestException, Body, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserhDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/auth.entity';
import * as bcryptjs from 'bcryptjs'
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
     @InjectModel( User.name ) 
    private userModel: Model<User>,
    private jwtService: JwtService ,
  ){}

  async create( CreateUserhDto:CreateUserhDto): Promise<User> {
      
    try
    {
      const { password , ...userData } = CreateUserhDto
      const newUser = new this.userModel({
        password :bcryptjs.hashSync( password , 10 ),
        ...userData

      });

      return await newUser.save();

  }
  catch (error) {
      
      if( error.code === 11000 )
        throw new BadRequestException( `${ CreateUserhDto.email } already exist ` )
      
      throw new InternalServerErrorException( 'Big crash')
      
    }
    
  }

  async login( loginDTO:loginDTO ){
    
    const { email , password } = loginDTO
    const user = await this.userModel.findOne({ email })

    if( !user ){
      throw new UnauthorizedException(`Not valid credential ${ email }`)
    }
    if( !bcryptjs.compareSync( password , user.password ) ){
      throw new UnauthorizedException(`Not valid credential password for email: ${ email }`)
    }

    const { password:_ , ...rest } = user.toJSON()


    return {
      user: rest ,
      // token: this.getJwtToken( { id: user.id } )
    }
    
  }

  register( registerDTO: registerDTO ){

      this.create( registerDTO )
      return 'ok'
  
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

  getJwtToken(payload: JwtPayload){
    console.log( 'payload: ', payload )
    const token:string = this.jwtService.sign( payload )
    return token
  }

}
