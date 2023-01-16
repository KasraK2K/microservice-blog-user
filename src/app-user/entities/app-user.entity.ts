import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Unique
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { PermissionName } from '../../common/enums/general.enum'

@Entity({ name: 'app_users' })
@Unique(['email'])
export class AppUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  surname: string

  @Column({ default: true })
  active: boolean

  @Column({ default: false })
  blocked: boolean

  @Column({ default: false })
  superuser: boolean

  @Column()
  email: string

  @Column({ default: PermissionName.CUSTOMER })
  permission: number

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  archive_at: Date

  // constructor(partial: Partial<AppUser>) {
  //   Object.assign(this, partial)
  // }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    console.log(this)
    if (this.password && this.password.length <= 20) this.password = this.hash(this.password)
  }

  hash(argument: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(argument, salt)
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
