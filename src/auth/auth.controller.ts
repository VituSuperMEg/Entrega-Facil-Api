import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('api/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(@Body() data: AuthDto) {
    return this.authService.signIn(data.email, data.password);
  }
}
