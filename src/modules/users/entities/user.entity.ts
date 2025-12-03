import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'bigint' })
  telegramChatId?: number;

  @Column({ nullable: true, unique: true })
  telegramToken?: string;
}
