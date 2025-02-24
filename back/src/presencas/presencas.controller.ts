import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresencasService } from './presencas.service';
import { CreatePresencaDto } from './dto/create-presenca.dto';
import { UpdatePresencaDto } from './dto/update-presenca.dto';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @Post()
  create(@Body() createPresencaDto: CreatePresencaDto) {
    return this.presencasService.create(createPresencaDto);
  }

  @Get()
  findAll() {
    return this.presencasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presencasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresencaDto: UpdatePresencaDto) {
    return this.presencasService.update(+id, updatePresencaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presencasService.remove(+id);
  }
}
