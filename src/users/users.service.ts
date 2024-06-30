import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { CreatePersonalDTO } from './dto/create.personal.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async find(id: number): Promise<User | string> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        personal: true,
      },
    });

    if (!user) {
      return 'Usuário Não Encontrado';
    }
    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const { nome, email, password, photo } = data;
    const hashPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        nome,
        password: hashPassword,
      },
    });
    return user;
  }

  async findPersonal(user_id: number) {
    return this.prisma.personal.findFirst({
      where: { user_id },
      include: {
        user: {
          select: {
            email: true,
            nome: true,
          },
        },
      },
    });
  }
  async createPersonalData(data: CreatePersonalDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    const nData = {
      cpf: data.cpf,
      rua: data.rua,
      cep: data.cep,
      numero: data.numero,
      uf: data.uf,
      complemento: data.complemento,
      user_id: user.id,
    };
    return this.prisma.personal.create({ data : nData });
  }
}
