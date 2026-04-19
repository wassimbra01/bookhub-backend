import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from '../../auth/generics/role.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    console.log("ROLE", req.user?.userRole);

    return req.user?.userRole === Roles.ROLE_ADMIN;
  }
}