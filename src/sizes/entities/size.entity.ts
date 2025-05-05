import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  image: string;

  @OneToMany(() => Flower, (flower) => flower.size)
  flowers: Flower[];
}
