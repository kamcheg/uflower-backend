import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
