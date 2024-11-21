import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { promisify } from 'util';
import * as request from 'supertest';

@Injectable()
export class AuthGuard implements CanActivate {
  
  

  constructor(private readonly jwtService: JwtService) {}

  
  canActivate(  context: ExecutionContext,):  Promise<boolean> {
  
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
    console.log("token: ",token)
    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: any): string | undefined {

    const [ type , token ] = request.headers.authorization.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;

  }

}
