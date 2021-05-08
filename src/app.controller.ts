import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('wa')
  initWhatsApp(): Observable<string> {
    return this.appService.initWhatsApp();
  }

  @Get('tg')
  initTelegram(): Observable<string> {
    return of('Not implemented yet.');
  }
}
