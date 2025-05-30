import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ExpensesModule} from './expenses/expenses.module'
import {CacheModule} from '@nestjs/cache-manager'
import {redisStore} from 'cache-manager-ioredis-yet'
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ExpensesModule,
        CacheModule.register({
            useFactory: async () => ({
                store: await redisStore({host: 'redis', port: 6379, ttl: 60})
            }),
            isGlobal: true
        }),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
