import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source.config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';
import { ProcessDocumentsModule } from './modules/process-documents/process-documents.module';
import { ProcessModule } from './modules/process/process.module';
import { RevisionRequestDocumentsModule } from './modules/revision-request-documents/revision-request-documents.module';
import { RevisionRequestModule } from './modules/revision-request/revision-request.module';
import { RevisionResponseDocumentsModule } from './modules/revision-response-documents/revision-response-documents.module';
import { RevisionResponseModule } from './modules/revision-response/revision-response.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { UserModule } from './modules/user/user.module';

/**
 * Módulo raiz da aplicação
 *
 * Responsável por:
 * - Configurar as variáveis de ambiente (.env)
 * - Estabelecer conexão com o banco de dados via TypeORM
 * - Importar e organizar todos os módulos funcionais da aplicação
 *
 * Módulos principais:
 * - AuthModule: Autenticação e autorização JWT
 * - UserModule: Gestão de usuários e advogados
 * - ProcessModule: Gerenciamento de processos jurídicos
 * - CategoryModule & SpecialtyModule: Categorização e especialidades
 * - RevisionModule: Fluxo de requisição e resposta de revisões
 * - DocumentsModules: Gerenciamento de documentos
 * - FileModule: Manipulação de arquivos
 */
@Module({
  imports: [
    // Configuração global das variáveis de ambiente
    // Carrega .env.test em ambiente de testes, .env em outros ambientes
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true, // Torna as variáveis acessíveis em todos os módulos
    }),

    // Configuração da conexão com o banco de dados MySQL
    // Utiliza as configurações definidas em data-source.config.ts
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),

    // Módulos de funcionalidades da aplicação
    UserModule,                          // Gestão de usuários
    CategoryModule,                      // Categorias de processos
    SpecialtyModule,                     // Especialidades dos advogados
    ProcessModule,                       // Processos jurídicos
    ProcessDocumentsModule,              // Documentos de processos
    FileModule,                          // Serviço de manipulação de arquivos
    RevisionRequestModule,               // Requisições de revisão
    RevisionRequestDocumentsModule,      // Documentos de requisições
    RevisionResponseModule,              // Respostas de revisão
    RevisionResponseDocumentsModule,     // Documentos de respostas
    AuthModule,                          // Autenticação e autorização
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

