import { RoleName, ServiceName, TokenType } from '../../common/enums/general.enum'

export interface IPayload {
  service: ServiceName
  role: RoleName
  type: TokenType
  id: number
}
