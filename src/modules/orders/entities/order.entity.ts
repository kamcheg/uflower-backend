import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderFlower } from '../../order-flowers/entities/order-flower.entity';
import { Expose } from 'class-transformer';
import Decimal from 'decimal.js';

@Entity()
export class Order extends AbstractEntity {
  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column()
  address: string;

  @Column()
  isDeliverToCustomer: boolean;

  @Column()
  recipientName: string;

  @Column()
  recipientPhone: string;

  @Column({ default: '' })
  comment: string;

  @OneToMany(() => OrderFlower, (orderFlower) => orderFlower.order, {
    cascade: true,
    eager: true,
  })
  orderFlowers: OrderFlower[];

  @Expose()
  get total(): number {
    return this.orderFlowers
      .reduce((sum, of) => {
        const price = new Decimal(of.price);
        const quantity = new Decimal(of.quantity);
        return sum.plus(price.times(quantity));
      }, new Decimal(0))
      .toNumber();
  }
}
