import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: `name must be filled` })
  @ApiProperty()
  public name: string;
}
