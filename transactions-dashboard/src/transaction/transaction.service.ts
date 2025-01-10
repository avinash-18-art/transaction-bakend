import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  // Fetch all transactions with optional filters for status and date range
  async getAllTransactions(
    page: number = 1,
    limit: number = 10,
    status?: string,
    startDate?: string,
    endDate?: string,
  ): Promise<Transaction[]> {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    return this.transactionModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  // Fetch transactions by school_id
  async getTransactionsBySchool(
    schoolId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Transaction[]> {
    return this.transactionModel
      .find({ school_id: schoolId })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  // Check the status of a transaction by custom_order_id
  async checkTransactionStatus(customOrderId: string): Promise<string> {
    const transaction = await this.transactionModel
      .findOne({ custom_order_id: customOrderId })
      .exec();

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction.status;
  }

  // Manual status update of a transaction
  async manualStatusUpdate(
    customOrderId: string,
    status: string,
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel
      .findOneAndUpdate(
        { custom_order_id: customOrderId },
        { status },
        { new: true },
      )
      .exec();

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }

    return updatedTransaction;
  }
}
