import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Disciplina } from './entities/disciplina.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DisciplinasService {
  constructor(
    @InjectModel(Disciplina.name) private disciplinaModel: Model<Disciplina>,
  ) {}

  async create(createDisciplinaDto: CreateDisciplinaDto) {
    if (
      !createDisciplinaDto.codigo_disciplina ||
      createDisciplinaDto.codigo_disciplina.length === 0
    ) {
      createDisciplinaDto.codigo_disciplina = this.gerarCodigoDisciplina();
    } else if (createDisciplinaDto.codigo_disciplina.length < 6) {
      throw new Error('Código de disciplina inválido. Deve no mínimo 6 caracteres.');
    }

    const nova_disciplina = new this.disciplinaModel(createDisciplinaDto);
    const resultado = await nova_disciplina.save();

    return new Disciplina(resultado.toJSON());
  }

  findAll() {
    return this.disciplinaModel.find().exec();
  }

  async findOne(codigo_disciplina: string) {
    let procurar_disciplina = await this.disciplinaModel
      .findOne({ codigo_disciplina: codigo_disciplina })
      .exec();

    if (!procurar_disciplina) {
      return new NotFoundException('Disciplina não encontrada.');
    }

    return procurar_disciplina;
  }

  async update(
    codigo_disciplina: string,
    updateDisciplinaDto: UpdateDisciplinaDto,
  ) {
    return await this.disciplinaModel
      .updateOne({ codigo_disciplina }, updateDisciplinaDto)
      .exec();
  }

  async remove(codigo_disciplina: string) {
    return await this.disciplinaModel.deleteOne({ codigo_disciplina }).exec();
  }

  // Métodos
  gerarCodigoDisciplina() {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }
    return codigo;
  }
}
