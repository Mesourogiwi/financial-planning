import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {randomUUID} from 'crypto'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    async generateToken(): Promise<any> {
        const payload = {sub: randomUUID()}
        const token = await this.jwtService.signAsync(payload)

        return {token}
    }
}
