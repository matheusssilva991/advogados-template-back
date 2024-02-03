import { unlink } from 'fs/promises';
import {
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RevisionResponse } from '../../revision-response/entities/revision-response.entity';

@Entity({ name: 'revision_response_document', orderBy: { id: 'ASC' } })
export class RevisionResponseDocument {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ type: 'varchar', name: 'file_name', length: 255, nullable: false })
  fileName: string;

  @Column({
    type: 'int',
    name: 'content_length',
    unsigned: true,
    nullable: false,
  })
  contentLength: number;

  @Column({
    type: 'varchar',
    name: 'content_type',
    length: 255,
    nullable: false,
  })
  contentType: string;

  @Column({ type: 'varchar', name: 'file_path', length: 500, nullable: false })
  filePath: string;

  @Column({
    type: 'int',
    name: 'revision_response_id',
    unsigned: true,
    nullable: false,
  })
  revisionResponseId: number;

  @ManyToOne(
    () => RevisionResponse,
    (revisionResponse) => revisionResponse.revisionResponseDocuments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'revision_response_id' })
  revisionResponse: RevisionResponse;

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

  @BeforeRemove()
  async removeFile() {
    try {
      await unlink(this.filePath);
    } catch (error) {
      throw new Error(`Error removing file: ${error.message}`);
    }
  }
}
