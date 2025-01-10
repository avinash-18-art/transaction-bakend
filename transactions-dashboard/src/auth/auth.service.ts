import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema'; // Assuming you have a User schema

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(username: string, password: string): Promise<any> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();

    // Return user details (excluding password)
    return { username: user.username };
  }

  // Login an existing user
  async login(username: string, password: string): Promise<any> {
    // Find user by username
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Validate user (can be used in guards)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  // Get JWT token payload from a JWT token
  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
