import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards , Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserhDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { get } from 'http';
import { User } from './entities/auth.entity';
import { LoginResponse } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post()
  create(@Body() createUserhDto: CreateUserhDto) {
    console.log('createUserDto: ', createUserhDto.name )
    return this.authService.create(createUserhDto);
  }

  @Post('/login')
  login( @Body() loginDTO: loginDTO ){
    return this.authService.login( loginDTO );
  }

  @Post('/register')
  register( @Body() registerDTO: registerDTO ){

      return this.authService.register( registerDTO );
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req : Request  ) {

    return this.authService.findAll();
  }

  @UseGuards( AuthGuard )
  @Get('check-token')
  checkToken(  @Request() req : Request ):LoginResponse{

    const user = req['user'] as User

    return {
      user,
      token: this.authService.getJwtToken({ id:user.id })
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
