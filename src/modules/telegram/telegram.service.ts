// telegram.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TelegramService {
  private readonly botToken: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN ?? '';
  }

  async sendMessage(chatId: number, text: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    });
  }

  async linkChatIdToUser(token: string, chatId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { telegramToken: token },
    });

    if (!user) return false;

    user.telegramChatId = chatId;
    user.telegramToken = ''; // удаляем одноразовый токен
    await this.userRepository.save(user);

    return true;
  }
}
