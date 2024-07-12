import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { CreateOrderDTO } from './dto/create-order-dto';

@Injectable()
export class OrderService {
  constructor(private orderModel: PrismaService) {}

  findAll() {
    return this.orderModel.order.findMany({
      include: {
        shipment: true,
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  async find(id: any) {
    const already = await this.orderModel.order.findUnique({
      where: { id: +id.id },
      include: {
        shipment: true,
        user: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
    });
    if (!already) {
      throw new HttpException(
        'Não foi possível encontrar o resgrito desta order',
        HttpStatus.BAD_GATEWAY,
      );
    }
    return already;
  }

  async create(data: CreateOrderDTO) {
    const order = await this.orderModel.order.create({
      data: {
        user: { connect: { id: data.user_id } },
        shipment: { connect: { id: data.shipment_id } },
      },
    });
    return order;
  }
}
