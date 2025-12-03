import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.types';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async handleTelegram(@Body() update: TelegramUpdate): Promise<void> {
    const message = update.message;
    if (!message?.text) return;

    const chatId: number = message.chat.id;
    const text: string = message.text.trim();

    // Обработка команды /start с токеном
    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const token = parts[1];

      if (!token) {
        await this.telegramService.sendMessage(
          chatId,
          '❌ Токен не найден. Пожалуйста, перейдите по правильной ссылке из личного кабинета.',
        );
        return;
      }

      const success = await this.telegramService.linkChatIdToUser(
        token,
        chatId,
      );

      if (success) {
        await this.telegramService.sendMessage(
          chatId,
          '✅ Telegram успешно привязан к вашему аккаунту!',
        );
      } else {
        await this.telegramService.sendMessage(
          chatId,
          '❌ Неверный токен. Убедитесь, что вы используете ссылку из личного кабинета.',
        );
      }

      return;
    }

    // Поведение по умолчанию
    await this.telegramService.sendMessage(
      chatId,
      '🤖 Для привязки аккаунта перейдите по ссылке из личного кабинета.',
    );
  }
}
