import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' }) //CREATE TABLE tb_postagens()
export class Produto {
  
  @PrimaryGeneratedColumn() // INT AUTO_INCREMENT PRIMARY KEY
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() //Validção dos dados do obeto
  @Column({ length: 100, nullable: false }) //VARCHAR (100) NOT NULL
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() //Validção dos dados do obeto
  @Column({ length: 1000, nullable: false }) //VARCHAR (1000) NOT NULL
  descricao: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty() //Validção dos dados do obeto
  @Column({ length: 1000, nullable: false }) //VARCHAR (1000) NOT NULL
  foto: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // DECIMAL(10, 2) NOT NULL
  preco: number; // Preço do jogo


  @UpdateDateColumn()
  data_lancamento: Date;
    categoria: any;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
  onDelete: 'CASCADE',
})
  categorias: Categoria;

}

