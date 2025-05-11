import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Flower } from '../../flowers/entities/flower.entity';
import { User } from '../../users/entities/user.entity';
import { IWorkTime } from '../../../common/types';
import { Shop } from '../../shops/entities/shop.entity';

@Entity()
export class Brand extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'json' })
  schedule: IWorkTime;

  @Column({ unique: true })
  sitePhone: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string | null;

  @OneToMany(() => Flower, (flower) => flower.brand)
  flowers: Flower[];

  @OneToMany(() => User, (user) => user.brand)
  users: User[];

  @OneToMany(() => Shop, (shop) => shop.brand)
  shops: Shop[];
}
