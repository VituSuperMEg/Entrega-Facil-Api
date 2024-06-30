import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException(
        'Este usuário não existe!',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(password, user.password)
    const match = await compare(password, user.password);
    if (!match) {
      throw new HttpException('Email/Senha inválida', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      sub: user.id,
      user: {
        nome: user.nome,
        email: user.email,
        photo: user.photo,
      },
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
