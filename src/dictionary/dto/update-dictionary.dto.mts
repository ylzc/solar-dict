import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDictionaryDto } from './create-dictionary.dto.mjs';

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {
}
