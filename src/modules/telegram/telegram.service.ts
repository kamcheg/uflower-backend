import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Update, Start, Ctx, InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { User } from '../users/entities/user.entity';

@Update()
export class TelegramService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectBot() private readonly bot: Telegraf,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const phone: string = (ctx as any).payload;
    const telegramId = ctx?.from?.id?.toString() || '';

    const user = await this.usersRepo.findOne({ where: { phone } });

    if (!user) {
      await ctx.reply('Пользователь не найден');
      return;
    }

    user.telegramChatId = telegramId;
    await this.usersRepo.save(user);

    await ctx.reply(`Телеграм успешно привязан! Ваш ID: ${telegramId}`);
  }

  async sendMessage(chatId: string, message: string) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
