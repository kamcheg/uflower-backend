import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Flower, (flower) => flower.recipients)
  flowers: Flower[];
}
