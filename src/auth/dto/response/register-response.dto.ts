import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class RegisterResDto {
  @Expose()
  username: string
}
