import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ nullable: false, length: 50 })
  password: string;

  @Column({ nullable: false, length: 50 })
  fullName: string;

  @Column({ nullable: false, default: true })
  active: boolean;
}
