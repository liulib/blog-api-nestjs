import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';
import { BasicStrategy } from './strategys/basic.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'lGq78nsY2dRdMA4DKbZUbOcVm9U2lCEb',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BasicStrategy],
})
export class AuthModule {}
