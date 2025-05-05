import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Size } from '../../sizes/entities/size.entity';
import { Reason } from '../../reasons/entities/reason.entity';
import { Recipient } from '../../recipients/entities/recipient.entity';
import { FlowerType } from '../../flower-types/entities/flower-type.entity';
import { Image } from '../../images/entities/image.entity';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Brand } from '../../brands/entities/brand.entity';

@Entity()
export class Flower extends AbstractEntity {
  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;

  @OneToMany(() => Image, (image) => image.flower)
  images: Image[];

  @ManyToOne(() => Size, (size) => size.flowers)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @ManyToOne(() => Brand, (brand) => brand.flowers)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Reason, (reason) => reason.flowers)
  @JoinTable({
    name: 'flower_reason',
    joinColumn: {
      name: 'flower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'reason_id',
      referencedColumnName: 'id',
    },
  })
  reasons: Reason[];

  @ManyToMany(() => Recipient, (recipient) => recipient.flowers)
  @JoinTable({
    name: 'flower_recipient',
    joinColumn: {
      name: 'flower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'recipient_id',
      referencedColumnName: 'id',
    },
  })
  recipients: Recipient[];

  @ManyToMany(() => FlowerType, (flowerType) => flowerType.flowers)
  @JoinTable({
    name: 'flower_flower-type',
    joinColumn: {
      name: 'flower_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'flower-type_id',
      referencedColumnName: 'id',
    },
  })
  flowerTypes: FlowerType[];
}
