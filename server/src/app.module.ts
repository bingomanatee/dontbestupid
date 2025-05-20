import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

import { ConfigModule } from '@nestjs/config';
import { UnsplashService } from './unsplash/unsplash.service';
import { UnsplashModule } from './unsplash/unsplash.module';
import { QuestModule } from './quest/quest.module';
import { QuizModule } from './quiz/quiz.module';
import { CookieCheckMiddleware } from './middleware/cookie-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CatsModule,
    UnsplashModule,
    QuestModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService, UnsplashService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieCheckMiddleware).forRoutes('*');
  }
}
