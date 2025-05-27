import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Flower } from '../../flowers/entities/flower.entity';
import { User } from '../../users/entities/user.entity';
import { IWorkTime } from '../../../common/types';
import { Shop } from '../../shops/entities/shop.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Brand extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  domain: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'json' })
  schedule: IWorkTime;

  @Column()
  sitePhone: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string | null;

  @Column({ type: 'varchar' })
  aboutTitle: string;

  @Column({ type: 'varchar' })
  aboutDescription: string;

  @OneToMany(() => Flower, (flower) => flower.brand)
  flowers: Flower[];

  @OneToMany(() => User, (user) => user.brand)
  users: User[];

  @OneToMany(() => Shop, (shop) => shop.brand, { eager: true })
  shops: Shop[];

  @OneToMany(() => Order, (order) => order.brand)
  orders: Order[];
}
