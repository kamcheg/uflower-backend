import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Flower, (flower) => flower.images)
  @JoinColumn({ name: 'flower_id' })
  flower: Flower;
}
