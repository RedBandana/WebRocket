
import { Controller, Post, Get, Body, Req, HttpException, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { isValidObjectId } from 'mongoose';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAll() {
        const users = await this.userService.getAll();
        return users;
    }

    @Get(':id')
    async getOne(@Param('id') userId: string) {
        if (!isValidObjectId(userId)) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        const user = await this.userService.get(userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Post()
    async create(@Body() createUserDto: UserDTO) {
        return await this.userService.create(createUserDto);
    }

    @Post('validate')
    async validateUser(@Req() req): Promise<any> {
        const user = await this.userService.validateUser(req.body.email, req.body.password);
        if (!user) {
            throw new HttpException('Invalid email/password', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}