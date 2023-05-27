import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service.mjs';
import { DictionaryController } from './dictionary.controller.mjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity.mjs';

@Module({
    imports: [TypeOrmModule.forFeature([Dictionary])],
    controllers: [DictionaryController],
    providers: [DictionaryService],
})
export class DictionaryModule {}
