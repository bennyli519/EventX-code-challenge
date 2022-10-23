import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Header('Content-Type', 'text/plain')
  index(): string {
    return 'OK';
  }

  @Get('/health')
  @Header('Content-Type', 'text/plain')
  health(): string {
    return 'OK';
  }
}
