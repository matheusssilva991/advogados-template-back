import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Specialty } from '../../../modules/specialty/entities/specialty.entity';
import { Process } from '../../process/entities/process.entity';

@Entity({ name: 'categories', orderBy: { id: 'ASC' } })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ name: 'name', length: 255, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Specialty, (specialty) => specialty.category)
  specialties: Specialty[];

  @OneToMany(() => Process, (process) => process.category)
  processes: Process[];

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
