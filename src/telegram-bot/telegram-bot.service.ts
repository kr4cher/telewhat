import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
  private telegramBot: TelegramBot;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.telegramBot = new TelegramBot(configService.get('TELEGRAM_BOT_TOKEN'), { polling: true });
    this.init();
  }

  private init() {
    this.telegramBot.on('message', (message) => {
      if (message.text.toLowerCase() === 'hi') {
        this.telegramBot.sendMessage(message.chat.id, 'Hello! :)');
      }
    });
  }
}
