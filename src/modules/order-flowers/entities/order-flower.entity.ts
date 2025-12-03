import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Index, Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Flower } from '../../flowers/entities/flower.entity';

@Index(['order', 'flower'], { unique: true })
@Entity()
export class OrderFlower extends AbstractEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderFlowers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Flower, (flower) => flower.orderFlowers, { eager: true })
  @JoinColumn({ name: 'flower_id' })
  flower: Flower;
}
