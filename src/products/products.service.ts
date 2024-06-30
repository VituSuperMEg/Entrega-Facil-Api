import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/util/prisma.service';
import { CreateProductsDTO } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(private productModel: PrismaService) {}

  findAll() {
    return this.productModel.products.findMany();
  }
  create(data: CreateProductsDTO) {
    return this.productModel.products.create({
      data,
    });
  }
}
