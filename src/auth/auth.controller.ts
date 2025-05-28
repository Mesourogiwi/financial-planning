import {Controller, Post, HttpCode, HttpStatus} from '@nestjs/common'
import {AuthService} from './auth.service'
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('generateToken')
    generateToken() {
        return this.authService.generateToken()
    }
}
