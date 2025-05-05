import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlowerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
