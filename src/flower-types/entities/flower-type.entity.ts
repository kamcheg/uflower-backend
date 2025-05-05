import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity('flower-type')
export class FlowerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Flower, (flower) => flower.flowerTypes)
  flowers: Flower[];
}
