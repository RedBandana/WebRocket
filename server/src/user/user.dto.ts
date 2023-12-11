import { IsString, IsEmail, IsDate, IsOptional, IsEnum } from 'class-validator';

export class UserDTO {
    @IsString() 
    readonly firstName: string;

    @IsString() 
    readonly lastName: string;

    @IsEmail() 
    readonly email: string;

    @IsString() 
    readonly phone: string;

    @IsString() 
    readonly profilepictureurl: string;

    @IsString() 
    readonly password: string;

    @IsEnum(['guest', 'requester', 'agent', 'administrator']) 
    readonly type: string;

    @IsDate() 
    @IsOptional() 
    timeCreated?: Date;
}