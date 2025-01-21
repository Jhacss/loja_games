import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_loja_games',
      entities: [Produto, Categoria],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    ProdutoModule,
    //AuthModule,
    //UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
