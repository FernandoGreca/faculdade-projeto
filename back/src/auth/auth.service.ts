import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string) {
    const usuario = await this.usersService.findByEmail(email);

    if (!usuario || usuario instanceof NotFoundException || !usuario.senha)
      throw new NotFoundException();

    const senha_correta = await compare(senha, usuario.senha);
    if (!senha_correta)
      return { message: 'Senha incorreta, tente novamente...' };

    const payload = { sub: usuario._id, email: usuario.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async alterarSenha(email: string, senha: string) {
    return await this.usersService.alterarSenha(email, senha);
  }
}
// const usuario = await this.userModel.findOne({ email }).exec();

// if (!usuario || !usuario.senha)
//   return { message: 'Usuário não encontrado, tente novamente...' };

// const senha_correta = await compare(senha, usuario.senha);
// if (!senha_correta) return { message: 'Senha incorreta, tente novamente...' };

// const token = await this.authService.signIn(email, senha);

// return token;
