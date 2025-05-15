import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'bigint' })
  telegramChatId?: number;

  @Column({ nullable: true })
  telegramToken?: string;

  @ManyToOne(() => Brand, (brand) => brand.users)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
