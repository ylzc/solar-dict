import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    Put
} from "@nestjs/common";
import { DictionaryService } from "./dictionary.service.mjs";
import { CreateDictionaryDto } from "./dto/create-dictionary.dto.mjs";
import { UpdateDictionaryDto } from "./dto/update-dictionary.dto.mjs";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("dictionary")
@Controller("dictionary")
export class DictionaryController {
    constructor(private readonly dictionaryService: DictionaryService) {
    }

    @Post()
    create(@Body() createDictionaryDto: CreateDictionaryDto) {
        return this.dictionaryService.create(createDictionaryDto);
    }

    @Get("/:page/:count")
    @ApiQuery({
        name: "name",
        required: false,
        type: String
    })
    page(
      @Param("page", ParseIntPipe) page: number,
      @Param("count", ParseIntPipe) count: number,
      @Query("name") name?: string
    ) {
        return this.dictionaryService.page(page, count, name);
    }

    @Get(":type")
    findOneByTypeWithCache(@Param("type") type: string) {
        return this.dictionaryService.findOneByTypeWithCache(type);
    }

    @Put(":id")
    update(
      @Param("id") id: string,
      @Body() updateDictionaryDto: UpdateDictionaryDto
    ) {
        return this.dictionaryService.update(id, updateDictionaryDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.dictionaryService.remove(id);
    }
}
