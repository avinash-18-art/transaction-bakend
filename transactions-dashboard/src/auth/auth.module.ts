import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';  // Optional: if you have a User module to fetch user info

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Use 'jwt' strategy by default
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',  // Use environment variable for security
      signOptions: {
        expiresIn: '1h',  // Set expiration time for the JWT token
      },
    }),
    UserModule,  // Optional: If you have a user module for user-related operations
  ],
  providers: [AuthService, JwtStrategy],  // Provide the AuthService and JwtStrategy to the module
  exports: [AuthService],  // Export AuthService to use it in other modules
})
export class AuthModule {}
