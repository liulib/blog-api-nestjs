import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Perms = (permission: string) =>
  SetMetadata('permission', permission);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    if (!permission) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.roles.length > 0) {
      // 是否具有权限的标志
      let hasPermission = false;
      // 遍历用户的角色
      user.roles.forEach(role => {
        role.menus.forEach(menu => {
          if (menu.perms === permission) {
            hasPermission = true;
          }
        });
      });
      return hasPermission;
    } else {
      throw new UnauthorizedException();
    }
  }
}
