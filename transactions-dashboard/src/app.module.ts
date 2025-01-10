import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
    }),

    // MongoDB connection setup
    MongooseModule.forRoot(process.env.MONGO_URI),

    // Import the Transaction and Auth modules
    TransactionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
