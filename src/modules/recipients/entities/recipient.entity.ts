import { Column, Entity, ManyToMany } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';
import { AbstractEntity } from '../../../common/entities/abstract.entity';

@Entity()
export class Recipient extends AbstractEntity {
  @Column()
  title: string;

  @ManyToMany(() => Flower, (flower) => flower.recipients)
  flowers: Flower[];
}
