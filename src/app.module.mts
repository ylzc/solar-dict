import { Module } from '@nestjs/common';
import { DictionaryModule } from './dictionary/dictionary.module.mjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity.mjs';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 35432,
            username: 'root',
            password: '5tgbNHY^',
            database: 'postgres',
            entityPrefix: 'solar_',
            schema: 'public',
            synchronize: true,
            entities: [
                //
                Dictionary,
            ],
            logging: 'all',
        }),
        DictionaryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
