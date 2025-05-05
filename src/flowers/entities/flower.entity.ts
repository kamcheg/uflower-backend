import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Size } from '../../sizes/entities/size.entity';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Size, (size) => size.flowers)
  @JoinColumn({ name: 'size_id' })
  size: Size;
}
