import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Atividade } from 'src/atividades/entities/atividade.entity';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Disciplina {
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Prop({ required: true, unique: true })
  codigo_disciplina: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  carga_horaria: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  professores: Array<User>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  alunos: Array<User>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Atividade' })
  atividades: Array<Atividade>;

  constructor(init: Partial<Disciplina>) {
    Object.assign(this, init);
  }
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);
