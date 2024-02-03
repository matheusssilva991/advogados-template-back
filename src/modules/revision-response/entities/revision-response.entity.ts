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
import { RevisionRequest } from '../../revision-request/entities/revision-request.entity';
import { RevisionResponseDocument } from '../../revision-response-documents/entities/revision-response-document.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'revision_response', orderBy: { id: 'ASC' } })
export class RevisionResponse {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ type: 'varchar', name: 'title', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', name: 'description', nullable: false })
  description: string;

  @Column({
    type: 'int',
    name: 'revision_request_id',
    unsigned: true,
    nullable: false,
  })
  revisionRequestId: number;

  @ManyToOne(() => RevisionRequest, (user) => user.revisionResponses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'revision_request_id' })
  revisionRequest: RevisionRequest;

  @Column({ type: 'int', name: 'user_id', unsigned: true, nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.revisionResponses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => RevisionResponseDocument,
    (revisionResponseDocument) => revisionResponseDocument.revisionResponse,
  )
  revisionResponseDocuments: RevisionResponseDocument[];

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
