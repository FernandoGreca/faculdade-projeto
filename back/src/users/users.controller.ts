import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // http://localhost:3000/users/criar-usuario
  @Post('criar-usuario')
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.matricula = criarMatricula();

    return this.usersService.create(createUserDto);
  }

  // http://localhost:3000/users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}

// Funções
function criarMatricula(): string {
  let matricula = 'UNIFIL-';

  const data = new Date().toISOString().replace(/[-:.]/g, '').slice(16, 18);
  const numeroAleatorio = Math.floor(Math.random() * 10000);

  matricula += `${data}${numeroAleatorio.toString().padStart(4, '0')}`;

  console.log(matricula);

  return matricula;
}

// POST - criação
// PUT - edição ou criação
// PATCH - edição
// GET - pegar
// DELETE - apaga
