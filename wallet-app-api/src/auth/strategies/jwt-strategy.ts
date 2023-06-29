// Nest
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// External
import { ExtractJwt, Strategy } from 'passport-jwt';

// Internal
import { AuthService } from '../auth.service';
import { JwtPayloadDto } from '../dtos';
import { User } from '../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const { userId: id } = payload;
    const user = await this.authService.findOneValidUserByIdOrError(id);
    return user;
  }
}
