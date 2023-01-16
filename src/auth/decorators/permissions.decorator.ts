import { SetMetadata } from '@nestjs/common'

/**
 * @param permissions {number[]}
 * NOTE: This decorator have to use before our method and set permission metadata so we have an array of integer show us witch permission
 * has access. So we have to use it in our role guard to access or denied if user has not currect permission number.
 * We now user permission number because we have added that to jwt
 */
export const Permissions = (...permissions: number[]) => SetMetadata('permissions', permissions)
