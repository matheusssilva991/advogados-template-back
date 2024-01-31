import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Process } from '../../process/entities/process.entity';
import { Specialty } from '../../specialty/entities/specialty.entity';

@Entity({ name: 'users', orderBy: { id: 'ASC' } })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column({ name: 'name', nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'email', nullable: false, type: 'varchar', length: 255 })
  email: string;

  @Column({
    name: 'phone_number',
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  phoneNumber?: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({ name: 'nro_oab', nullable: true, type: 'varchar', length: 100 })
  nroOAB?: string;

  @Column({
    name: 'role',
    nullable: true,
    type: 'varchar',
    length: 30,
    default: 'lawyer',
  })
  role: string;

  @OneToMany(() => Specialty, (specialty) => specialty.user)
  specialties: Specialty[];

  @OneToMany(() => Process, (process) => process.user)
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

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (!this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
