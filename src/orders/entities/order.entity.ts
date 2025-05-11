import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderFlower } from '../../order-flowers/entities/order-flower.entity';

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
  })
  orderFlowers: OrderFlower[];
}
