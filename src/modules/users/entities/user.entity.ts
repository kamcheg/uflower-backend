import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Role } from '../../auth/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'bigint' })
  telegramChatId?: number;

  @Column({ nullable: true, unique: true })
  telegramToken?: string;

  // TODO postgresql
  @Column({ type: 'simple-array' })
  roles: Role[];

  @ManyToOne(() => Brand, (brand) => brand.users)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
