import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order-dto';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  find(@Param() id: number) {
    return this.orderService.find(id);
  }

  @Post()
  create(@Body() data: CreateOrderDTO) {
    return this.orderService.create(data);
  }
}
