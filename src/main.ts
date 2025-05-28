import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )

    const config = new DocumentBuilder()
        .setTitle('Financial Planning API')
        .setDescription('Projeto de desafio técnico de planilha de despesas')
        .setVersion('1.0')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
