import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { generateHash } from 'src/util/hash';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShipmentService {
  constructor(private shipmentModel: PrismaService) {}

  findAll() {
    return this.shipmentModel.shipment.findMany();
  }

  async create(data: CreateShipmentDTO) {
    const { product_id, destino, origem, status } = data;

    const shipmentData: Prisma.ShipmentCreateInput = {
      codigo: generateHash(),
      destino,
      origem,
      status,
      product: { connect: { id: product_id } },
      criado_em: new Date(),
      recebido_em: new Date(),
    };

    const shipment = await this.shipmentModel.shipment.create({
      data: shipmentData,
    });
    return shipment;
  }
}
