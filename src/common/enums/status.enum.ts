/**
 * Enumeração dos possíveis status de processos e requisições no sistema
 *
 * Define os estados pelos quais um processo jurídico ou requisição
 * de revisão pode passar durante seu ciclo de vida:
 *
 * - EmAguardo: Aguardando ação inicial
 * - EmAndamento: Processo/requisição em progresso
 * - Concluido: Finalizado com sucesso
 * - NaoVisualizado: Ainda não foi visualizado pelo responsável
 * - AguardandoRetorno: Esperando resposta/feedback
 * - EmInicializacao: Fase inicial de configuração
 */
export enum Status {
  /** Processo aguardando início de trabalho */
  EmAguardo = 'Em aguardo',

  /** Processo atualmente sendo trabalhado */
  EmAndamento = 'Em andamento',

  /** Processo finalizado */
  Concluido = 'Concluído',

  /** Requisição não visualizada ainda */
  NaoVisualizado = 'Não visualizado',

  /** Aguardando retorno de terceiros */
  AguardandoRetorno = 'Aguardando retorno',

  /** Fase inicial de setup */
  EmInicializacao = 'Em inicialização',
}

