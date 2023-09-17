import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.schema';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }])],
  providers: [RequestService],
  controllers: [RequestController],
  exports: [RequestService] // important: make sure to export the RequestService
})
export class RequestModule {}
