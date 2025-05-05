import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Brand extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Flower, (flower) => flower.brand)
  flowers: Flower[];
}
