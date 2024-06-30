import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { CreatePersonalDTO } from './dto/create.personal.dto';

@Controller('v1/users')
export class UsersController {
    constructor(private userService : UsersService) {}

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }
    @Get(':id') 
    async find (@Param('id') id : number) {
       return await this.userService.find(+id);
    }
    @Get('personal/:id') 
    async findPersonal (@Param('id') id : number) {
       return await this.userService.findPersonal(+id);
    }
    @Post() 
    async create (@Body() data : CreateUserDTO) {
       await this.userService.create(data);
    }
    @Post('personal')
    async createPersonal (@Body() data : CreatePersonalDTO) {
        const { email } = data;
        if(!email) {
            throw new HttpException("Informe o usuário!", HttpStatus.BAD_REQUEST);
        }
        return await this.userService.createPersonalData(data);
    }
}
