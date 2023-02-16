import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;
  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;
  default: '';
  @Column({
    nullable: false,
  })
  password: string;
}
