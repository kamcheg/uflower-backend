import { AbstractEntity } from '../../../common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Submission extends AbstractEntity {
  @Column()
  phone: string;

  @Column()
  name: string;
}
