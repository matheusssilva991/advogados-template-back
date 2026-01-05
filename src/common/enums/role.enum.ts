/**
 * Enumeração dos papéis (roles) disponíveis no sistema
 *
 * Define os níveis de acesso e permissões dos usuários:
 *
 * - lawyer: Advogado - Pode gerenciar seus processos e criar requisições de revisão
 * - admin: Administrador - Acesso total ao sistema, incluindo gestão de usuários
 *
 * Hierarquia de permissões (do menor ao maior):
 * lawyer < admin
 */
export enum Role {
  /** Advogado - Nível intermediário de acesso */
  lawyer = 'lawyer',

  /** Administrador - Acesso total ao sistema */
  admin = 'admin',
}
