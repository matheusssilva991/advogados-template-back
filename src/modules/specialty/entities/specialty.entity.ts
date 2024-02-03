import { Category } from '../../../modules/category/entities/category.entity';
import { User } from '../../../modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'specialty', orderBy: { id: 'ASC' } })
export class Specialty {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'affinity', type: 'int', nullable: false })
  affinity: number;

  @Column({ name: 'user_id', type: 'int', nullable: false, unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.specialties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'category_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  categoryId: number;

  @ManyToOne(() => Category, (user) => user.specialties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

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
