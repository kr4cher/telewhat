import { Injectable, Logger } from '@nestjs/common';
import * as QRCode from 'qrcode-terminal';
import { from, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatId, Client, Message } from 'whatsapp-web.js';

const SESSION_FILE_PATH = './session.json';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  private client: Client;
  private _receivedMessage$ = new Subject<Message>();

  constructor() {
    this.client = new Client({});
  }

  init(): Observable<string> {
    this.client.on('qr', (qr) => {
      QRCode.generate(qr, { small: true });
    });
    this.client.on('ready', () => {
      this.logger.log('WhatsApp client is ready');
    });
    this.client.on('disconnected', () => {
      this.logger.log('WhatsApp client disconnected');
    });
    this.client.on('message', (msg) => {
      this._receivedMessage$.next(msg);
    });

    return from(this.client.initialize()).pipe(
      map(() => 'WhatsApp Client initialized - ' + new Date().toLocaleString()),
    );
  }

  sendTextMessage(chatId: string, message: string): Observable<Message> {
    return from(this.client.sendMessage(chatId, message));
  }

  get receivedMessage$(): Observable<Message> {
    return this._receivedMessage$.asObservable();
  }
}
