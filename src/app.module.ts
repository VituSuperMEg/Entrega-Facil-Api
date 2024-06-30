import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './util/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShipmentModule } from './shipment/shipment.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, ShipmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
