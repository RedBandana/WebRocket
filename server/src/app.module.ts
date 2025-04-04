import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONN_STRING),
    UserModule, 
    RequestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
