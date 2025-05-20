import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

// partly ai generated

@Injectable()
export class CookieCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies?.token) {
      console.log('Token cookie found:', req.cookies.token);
      try {
        const value = JSON.parse(req.cookies.token);
        if (value.expiresAt - Date.now() < 1000 * 60 * 60) {
          this.makeToken(res, value.tokenID);
        }
      } catch (err) {
        console.log('cannot parse ', req.cookies.token, err);
      }
    } else {
      console.log('no token found');
      this.makeToken(res, v4());
    }
    next();
  }

  makeToken(res: Response, uuid?: string) {
    const expiresAt = Date.now() + 1000 * 60 * 60 * 4; // 4 hours from now
    const value = JSON.stringify({ tokenID: uuid ?? v4(), expiresAt });

    res.cookie('token', value, {
      httpOnly: true, // can't be accessed by JS
      secure: false, // true if using HTTPS
      sameSite: 'lax', // CSRF protection
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    console.log('Token cookie initialized', value);
  }
}
