import { IsString, IsEmail, IsDate, IsOptional, IsEnum } from 'class-validator';

export class RequestDTO {
    @IsString() 
    @IsOptional() 
    readonly agentId?: string;

    @IsString() 
    readonly firstName: string;

    @IsString() 
    readonly lastName: string;

    @IsEmail() 
    readonly email: string;

    @IsString() 
    readonly phone: string;

    @IsEnum(['find opportunity', 'improve situation'])
    readonly mainInterest: string;

    @IsString() 
    readonly introducedBy: string;

    @IsDate() 
    @IsOptional() 
    timeCreated?: Date;
}