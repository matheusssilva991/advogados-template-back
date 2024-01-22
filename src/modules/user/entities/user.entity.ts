import * as bcrypt from 'bcrypt';
import { Specialty } from 'src/modules/specialty/entities/specialty.entity';
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

@Entity({ name: 'users', orderBy: { id: 'ASC' } })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
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
  phoneNumber: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({ name: 'nro_oab', nullable: true, type: 'varchar', length: 100 })
  nroOAB: string;

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