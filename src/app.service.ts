import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WhatsAppService } from './whatsapp/whatsapp.service';

@Injectable()
export class AppService {
  constructor(private readonly whatsAppService: WhatsAppService) {}

  initWhatsApp(): Observable<string> {
    return this.whatsAppService.init();
  }
}
