import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { IWorkTime } from '../../../common/types';
import { Brand } from '../../brands/entities/brand.entity';

@Entity()
export class Shop extends AbstractEntity {
  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'json' })
  schedule: IWorkTime;

  @Column({ type: 'json' })
  coords: [number, number];

  @ManyToOne(() => Brand, (brand) => brand.shops)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
