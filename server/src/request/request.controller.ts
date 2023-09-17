import { Controller, Post, Body } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDTO } from './request.dto';

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Post()
    async create(@Body() createRequestDto: RequestDTO) {
        return await this.requestService.create(createRequestDto);
    }
}