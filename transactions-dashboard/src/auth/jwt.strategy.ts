import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Replace with a strong secret or use environment variables
    });
  }

  async validate(payload: any) {
    // Payload contains the decoded JWT token data (e.g., user information)
    // In this case, we only store the username, but you can store more information in the payload
    const user = await this.authService.decodeToken(payload.username);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user; // Attach user object to the request
  }
}
