import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Size } from '../../sizes/entities/size.entity';
import { Reason } from '../../reasons/entities/reason.entity';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Size, (size) => size.flowers)
  @JoinColumn({ name: 'size_id' })
  size: Size;

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
}
