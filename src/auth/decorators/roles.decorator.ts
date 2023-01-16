import { SetMetadata } from '@nestjs/common'

/**
 * @param roles {number[]}
 * NOTE: This decorator have to use before our method and set role metadata so we have an array of integer show us witch role
 * has access. So we have to use it in our role guard to access or denied if user has not currect role number.
 * We now user role number because we have added that to jwt
 */
export const Roles = (...roles: number[]) => SetMetadata('roles', roles)
