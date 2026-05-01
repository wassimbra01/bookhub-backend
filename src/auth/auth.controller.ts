import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authSer : AuthService) {}
    
    @Post('signup')
    inscription(@Body() body) {
       return this.authSer.signUp(body);
    }
    
    @Post('signin')
    seConnecter(@Body() body) {
       return this.authSer.signIn(body);
    }

    @Get('users')
    getAllUsers() {
       return this.authSer.getAllUsers();
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id: number) {
       return this.authSer.deleteUser(id);
    }
}