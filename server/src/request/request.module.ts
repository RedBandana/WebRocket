import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.schema';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
    UserModule
  ],
  providers: [RequestService],
  controllers: [RequestController],
  exports: [RequestService] // important: make sure to export the RequestService
})
export class RequestModule {}
