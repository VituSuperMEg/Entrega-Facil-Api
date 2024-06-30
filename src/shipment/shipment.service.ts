import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { generateHash } from 'src/util/hash';

@Injectable()
export class ShipmentService {
  constructor(private shipmentModel: PrismaService) {}

  findAll() {
    return this.shipmentModel.shipment.findMany();
  }

  async create(data: CreateShipmentDTO) {
    const { product_id, destino, origem, status } = data;

    const shipment = await this.shipmentModel.shipment.create({
      data: {
        codigo: generateHash(),
        product_id,
        destino,
        origem,
        status,
      },
    });
    return shipment;
  }
}
