import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column('varchar', { name: 'first_name', length: 45, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 45, nullable: false })
  lastName: string;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false }) // Defaults to 255 characters
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}