import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Reason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Flower, (flower) => flower.reasons)
  flowers: Flower[];
}
