import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Flower } from '../../flowers/entities/flower.entity';

@Entity()
export class Brand extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'json' })
  schedule: { from: string; to: string };

  @Column({ unique: true })
  sitePhone: string;

  @OneToMany(() => Flower, (flower) => flower.brand)
  flowers: Flower[];
}
