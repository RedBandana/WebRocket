
import { Controller, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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