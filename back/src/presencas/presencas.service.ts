import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePresencaDto } from './dto/create-presenca.dto';
import { UpdatePresencaDto } from './dto/update-presenca.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Presenca } from './entities/presenca.entity';
import { Model } from 'mongoose';
import { Disciplina } from 'src/disciplinas/entities/disciplina.entity';
import { User } from 'src/users/entities/user.entity';
import { DisciplinasService } from 'src/disciplinas/disciplinas.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PresencasService {
  constructor(
    @InjectModel(Presenca.name) private presencaModel: Model<Presenca>,
    @Inject(forwardRef(() => DisciplinasService)) private disciplinaService,
    @Inject(forwardRef(() => UsersService)) private userService,
  ) {}

  async create(createPresencaDto: CreatePresencaDto) {
    if (createPresencaDto.data == undefined) {
      createPresencaDto.data = new Date();
    }

    // Procura disciplina
    const disciplina = await this.disciplinaService.findOne(
      createPresencaDto.codigo_disciplina,
    );
    if (disciplina instanceof NotFoundException || !disciplina) {
      return new NotFoundException('Disciplina não encontrada.');
    }

    // Procura aluno
    const aluno = await this.userService.findOne(createPresencaDto.id_aluno);
    if (aluno instanceof NotFoundException || !aluno) {
      return new NotFoundException('Aluno não encontrado.');
    }

    await new this.presencaModel(createPresencaDto).save();

    return { message: 'Presença registrada com sucesso!' };
  }

  async findAll() {
    return await this.presencaModel.find().exec();
  }

  async findOne(id: string) {
    let procurar_presenca = await this.presencaModel
      .findOne({ _id: id })
      .exec();

    if (!procurar_presenca) {
      return new NotFoundException('Presença não encontrada.');
    }

    return procurar_presenca;
  }

  async update(id: string, updatePresencaDto: UpdatePresencaDto) {
    return await this.presencaModel
      .updateOne({ _id: id }, updatePresencaDto)
      .exec();
  }

  async remove(id: string) {
    return await this.presencaModel.deleteOne({ _id: id }).exec();
  }

  async encontraListaPresenca(id_aluno: string) {
    const presencas = await this.presencaModel
      .find({
        'aluno._id': id_aluno,
      })
      .exec();

    if (!presencas || presencas.length === 0) {
      throw new NotFoundException(
        'Nenhuma presença encontrada para este aluno.',
      );
    }

    return presencas;
  }
}
