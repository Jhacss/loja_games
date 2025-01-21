import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                produto: true,
            },
        })
    }

    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations:{
                produto: true
            }
        })

        if(!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)

        return usuario;
    }
    //metodo auxiliar para validação do usuario
    async findByUsuario(usuario: string): Promise<Usuario | undefined>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    
    }

    async create(usuario: Usuario): Promise<Usuario>{

        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(buscaUsuario)
            throw new HttpException ("O Usuário já existe!", HttpStatus.BAD_REQUEST)

        usuario.dataNascimento = new Date(usuario.dataNascimento)
        
        const  dataAtual = new Date()
        let idade = dataAtual.getFullYear() - usuario.dataNascimento.getFullYear()
        const diaAtual = dataAtual.getDay()
        const mesAtual = dataAtual.getMonth()
        const mesNascimento = usuario.dataNascimento.getMonth()
        const diaNascimento = usuario.dataNascimento.getDay()


    if(mesAtual < mesNascimento ||(mesAtual === mesNascimento && diaAtual < diaNascimento)) 
        idade--;

    if(idade < 18)
            throw new HttpException("Usuario precisa ter 18 anos!", HttpStatus.BAD_REQUEST)
        
        

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario>{

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        if(buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException ("O Usuário (e-mail) já cadastrado!", HttpStatus.BAD_REQUEST)

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

        return await this.usuarioRepository.save(usuario);
    }
}