import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export class RequestDTO {
    @IsString() 
    readonly requesterId: string;

    @IsString() 
    readonly agentId: string;

    @IsEnum(['find opportunity', 'improve situation'])
    readonly mainInterest: string;

    @IsString() 
    readonly introducedBy: string;

    @IsDate() 
    @IsOptional() 
    timeCreated?: Date;
}