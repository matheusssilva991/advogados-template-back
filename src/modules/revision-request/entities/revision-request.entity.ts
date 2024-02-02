import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Process } from '../../process/entities/process.entity';

@Entity({ name: 'revision_request', orderBy: { id: 'ASC' } })
export class RevisionRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ type: 'varchar', name: 'title', length: 255 })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'int', name: 'process_id', unsigned: true })
  processId: number;

  @ManyToOne(() => Process, (process) => process.revisionRequests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id' })
  process: Process;

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
