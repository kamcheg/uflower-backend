import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Column } from 'typeorm';

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
}
