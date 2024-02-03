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
import { Process } from '../../process/entities/process.entity';
import { RevisionRequestDocument } from '../../revision-request-documents/entities/revision-request-document.entity';
import { RevisionResponse } from '../../revision-response/entities/revision-response.entity';

@Entity({ name: 'revision_request', orderBy: { id: 'ASC' } })
export class RevisionRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ type: 'varchar', name: 'title', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'int', name: 'process_id', unsigned: true, nullable: false })
  processId: number;

  @ManyToOne(() => Process, (process) => process.revisionRequests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id' })
  process: Process;

  @OneToMany(
    () => RevisionRequestDocument,
    (revisionRequestDocument) => revisionRequestDocument.revisionRequest,
  )
  revisionRequestDocuments: RevisionRequestDocument[];

  @OneToMany(
    () => RevisionResponse,
    (revisionResponse) => revisionResponse.revisionRequest,
  )
  revisionResponses: RevisionResponse[];

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
