import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://syed456abdul:Kjie5z1ewYFdbxpr@cluster0.7hm7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
