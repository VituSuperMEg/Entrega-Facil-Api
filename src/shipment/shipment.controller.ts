import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDTO } from './dto/create-shipment.dto';

@Controller('api/shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Post()
  create(@Body() data: CreateShipmentDTO) {
    return this.shipmentService.create(data);
  }

  @Post('update-status')
  updateStatus(@Body() data: any) {
    return this.shipmentService.updateStatusShipment(data);
  }
}
