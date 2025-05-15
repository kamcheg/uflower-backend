import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.types';

const userStates = new Map<number, 'awaiting_token' | null>();

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async handleTelegram(@Body() update: TelegramUpdate): Promise<void> {
    const message = update.message;
    if (!message?.text) return;

    const chatId: number = message.chat.id;
    const text: string = message.text.trim();

    if (text === '/start') {
      userStates.set(chatId, 'awaiting_token');
      await this.telegramService.sendMessage(
        chatId,
        '🔑 Пожалуйста, введите токен, который вы видите в личном кабинете',
      );
      return;
    }

    const state = userStates.get(chatId);
    if (state === 'awaiting_token') {
      const token = text;
      const success = await this.telegramService.linkChatIdToUser(
        token,
        chatId,
      );

      if (success) {
        await this.telegramService.sendMessage(
          chatId,
          '✅ Telegram успешно привязан к вашему аккаунту!',
        );
        userStates.delete(chatId);
      } else {
        await this.telegramService.sendMessage(
          chatId,
          '❌ Неверный токен. Попробуйте снова.',
        );
      }
      return;
    }

    await this.telegramService.sendMessage(
      chatId,
      '🤖 Напишите /start чтобы привязать Telegram.',
    );
  }
}
