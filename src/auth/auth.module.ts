import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {JwtModule} from '@nestjs/jwt'
import {APP_GUARD} from '@nestjs/core'
import {AuthGuard} from './auth.guard'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
