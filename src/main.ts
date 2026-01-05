import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

/**
 * Função de inicialização da aplicação NestJS
 *
 * Responsável por:
 * - Criar a instância da aplicação
 * - Configurar CORS para comunicação com o frontend
 * - Habilitar o parser de cookies para autenticação JWT
 * - Ativar validação global de DTOs
 * - Iniciar o servidor na porta especificada
 */
async function bootstrap() {
  // Cria a aplicação NestJS com o módulo principal
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir requisições do frontend
  // Utiliza a URL do frontend definida nas variáveis de ambiente
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Permite o envio de cookies e credenciais
  });

  // Habilita o middleware para parsing de cookies
  // Necessário para extrair o token JWT dos cookies da requisição
  app.use(cookieParser());

  // Ativa validação global usando class-validator
  // Valida automaticamente todos os DTOs nas requisições
  // transform: true - converte os payloads para as instâncias corretas dos DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Inicia o servidor na porta definida nas variáveis de ambiente
  // Fallback para porta 3000 caso não esteja definida
  await app.listen(process.env.PORT || 3000);
}

// Executa a função de inicialização
bootstrap();

