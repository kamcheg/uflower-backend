import { Column, Entity, ManyToMany } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';
import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity('flower-type')
export class FlowerType extends AbstractEntity {
  @Column()
  title: string;

  @ManyToMany(() => Flower, (flower) => flower.flowerTypes)
  flowers: Flower[];
}
