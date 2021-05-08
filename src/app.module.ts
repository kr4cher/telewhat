import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsAppService } from './whatsapp/whatsapp.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, WhatsAppService, TelegramBotService],
})
export class AppModule {}
