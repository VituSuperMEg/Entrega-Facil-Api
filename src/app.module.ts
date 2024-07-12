import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './util/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShipmentModule } from './shipment/shipment.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, ShipmentModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
