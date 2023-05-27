import { Injectable } from "@nestjs/common";
import { CreateDictionaryDto } from "./dto/create-dictionary.dto.mjs";
import { UpdateDictionaryDto } from "./dto/update-dictionary.dto.mjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Dictionary } from "./entities/dictionary.entity.mjs";
import { nanoid } from "nanoid";

@Injectable()
export class DictionaryService {
    constructor(
      @InjectRepository(Dictionary)
      private dictRepo: Repository<Dictionary>
    ) {
    }

    async create(createDictionaryDto: CreateDictionaryDto) {
        return this.dictRepo.save({
            id: nanoid(),
            ...createDictionaryDto
        });
    }

    async page(page: number, count: number, name?: string) {
        const [records, total] = await this.dictRepo.findAndCount({
            where: {
                name: name ? Like(`%${name}%`) : undefined
            },
            skip: page <= 1 ? 0 : page * count,
            take: count
        });
        return {
            records,
            total,
            page: page <= 1 ? 1 : page,
            count
        };
    }

    // redis缓存 + redis分布式锁防止防止无缓存是触发多次数据库查询引发血崩
    // type无数据也需要缓存,防止以为缓存没初始化一直查询数据库
    // TODO: 如何解决恶意使用不存在的type一直查询导致redis占用内存激增
    // TODO: 还是缓存使用双写
    findOneByTypeWithCache(type: string) {
        return this.dictRepo.findOne({
            where: {
                type: type ? type : undefined
            },
            withDeleted: false
        });
    }

    // 更新删除必须指定主键,防止波及更多数据
    update(id: string, updateDictionaryDto: UpdateDictionaryDto) {
        return this.dictRepo.update(id, updateDictionaryDto);
    }

    // 更新删除必须指定主键,防止波及更多数据
    remove(id: string) {
        return this.dictRepo.softDelete(id);
    }
}
