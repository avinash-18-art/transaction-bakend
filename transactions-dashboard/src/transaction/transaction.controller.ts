import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // Endpoint to fetch all transactions with pagination and search
  @Get()
  async getAllTransactions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    return await this.transactionService.getAllTransactions(page, limit, search);
  }

  // Endpoint to fetch transactions by school_id
  @Get('school/:schoolId')
  async getTransactionsBySchool(
    @Param('schoolId') schoolId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.transactionService.getTransactionsBySchool(schoolId, page, limit);
  }

  // Endpoint to check the status of a transaction using custom_order_id
  @Get('status/:customOrderId')
  async checkTransactionStatus(@Param('customOrderId') customOrderId: string) {
    return await this.transactionService.checkTransactionStatus(customOrderId);
  }

  // Endpoint to manually update the transaction status
  @Post('status/:customOrderId')
  @UseGuards(JwtAuthGuard)  // Protect the endpoint with JWT authentication
  async updateTransactionStatus(
    @Param('customOrderId') customOrderId: string,
    @Body('status') status: string,
  ) {
    return await this.transactionService.updateTransactionStatus(customOrderId, status);
  }

  // Webhook to receive transaction status updates (POST)
  @Post('webhook/status')
  async webhookStatusUpdate(@Body() statusUpdatePayload: any) {
    return await this.transactionService.webhookStatusUpdate(statusUpdatePayload);
  }
}
