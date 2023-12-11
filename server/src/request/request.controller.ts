import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestDTO } from './request.dto';
import { mailTransporter } from 'src/utils/mail-transproter';
import { UserService } from 'src/user/user.service';

@Controller('requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService,
        private readonly userService: UserService
    ) { }

    @Post()
    async create(@Body() createRequestDto: RequestDTO) {
        try {
            const request = await this.requestService.create(createRequestDto);
            const agent = await this.userService.get(request.agentId);
            const mailOptions = {
                to: 'aurelende@protonmail.com',
                cc: agent?.email,
                from: process.env.EMAIL_USERNAME,
                template: 'new-communication',
                subject: 'New Rocket Team Request',
                text: `New Rocket Team Request You received a new Rocket Team request. Please answer it in the next 24 h.`,
                html: `<h1>New Rocket Team Request</h1><p>You received a new Rocket Team request. Please answer it in the next 24 h.</p>`,
            };

            await mailTransporter.sendMail(mailOptions);
            return request;
        }
        catch (err) {
            throw new HttpException("Something went wrong. Please try again.", HttpStatus.BAD_REQUEST);

        }

    }
}