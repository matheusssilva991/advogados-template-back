import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { ProcessDocument } from '../../process-documents/entities/process-document.entity';
import { RevisionRequest } from '../../revision-request/entities/revision-request.entity';

@Entity({ name: 'process', orderBy: { id: 'ASC' } })
export class Process {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({
    name: 'process_key',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  processKey: string;

  @Column({ name: 'name', nullable: true, type: 'varchar', length: 255 })
  name?: string;

  @Column({ name: 'matter', nullable: true, type: 'varchar', length: 255 })
  matter?: string;

  @Column({ name: 'description', nullable: true, type: 'text' })
  description?: string;

  @Column({
    name: 'distribution_date',
    nullable: true,
    type: 'date',
  })
  distributionDate?: Date;

  @Column({ name: 'conclusion_date', nullable: true, type: 'date' })
  conclusionDate?: Date;

  @Column({ name: 'deadline', nullable: true, type: 'date' })
  deadline?: Date;

  @Column({
    name: 'status',
    nullable: true,
    type: 'varchar',
    length: 30,
    default: 'Em Aguardo',
  })
  status?: string;

  @Column({
    name: 'is_urgent',
    nullable: true,
    type: 'tinyint',
    default: 0,
  })
  isUrgent?: number;

  @Column({
    name: 'legal_opinion',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  legalOpinion?: string;

  @Column({
    name: 'user_id',
    nullable: true,
    type: 'int',
    unsigned: true,
  })
  userId?: number;

  @ManyToOne(() => User, (user) => user.processes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'category_id',
    nullable: false,
    type: 'int',
    unsigned: true,
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.processes)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => ProcessDocument,
    (processDocument) => processDocument.process,
  )
  processDocuments: ProcessDocument[];

  @OneToMany(
    () => RevisionRequest,
    (revisionRequest) => revisionRequest.process,
  )
  revisionRequests: RevisionRequest[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
