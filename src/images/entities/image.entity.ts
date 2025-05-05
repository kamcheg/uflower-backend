import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';
import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity()
export class Image extends AbstractEntity {
  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => Flower, (flower) => flower.images)
  @JoinColumn({ name: 'flower_id' })
  flower: Flower;
}
