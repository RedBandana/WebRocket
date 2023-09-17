
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './request.interface';
import { RequestDTO } from './request.dto';

@Injectable()
export class RequestService {
    constructor(@InjectModel('Request') private readonly requestModel: Model<Request>) {}

    async create(request: RequestDTO) {
        const createdRequest = new this.requestModel(request);
        return await createdRequest.save();
    }
}