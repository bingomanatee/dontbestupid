import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser'; // ✅

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static assets from frontend
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'frontend', 'dist'));
  app.use(cookieParser());

  app.use((req: Request, res: Response, next) => {
    if (req.method === 'GET' && !req.url.startsWith('/api') && !req.url.includes('.')) {
      res.sendFile(join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
    } else {
      next();
    }
  });

  await app.listen(3000);
}
bootstrap();
