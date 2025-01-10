import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables from the .env file
    NestConfigModule.forRoot({
      envFilePath: '.env', // Path to the .env file
      isGlobal: true,      // Make the configuration globally accessible across the app
    }),
  ],
  exports: [NestConfigModule], // Export the module to be used in other parts of the app
})
export class ConfigModule {}
