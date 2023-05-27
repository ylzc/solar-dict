import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDictionaryDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    type: string;

}
