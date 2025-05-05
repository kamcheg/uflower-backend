import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity()
export class Brand extends AbstractEntity {
  @Column()
  name: string;
}
