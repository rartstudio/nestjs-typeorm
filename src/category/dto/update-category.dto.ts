import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: `name must be filled` })
  @ApiProperty()
  public name: string;
}
