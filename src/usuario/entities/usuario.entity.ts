import {
  IsDate,
  isDate,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Transform, TransformFnParams, Type } from 'class-transformer';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
 
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

 
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  foto: string;

  @Column()
  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: Produto[];
}
