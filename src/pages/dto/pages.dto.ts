import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Getting Started SubPage',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '1f4ab',
  })
  icon?: string;

  @IsOptional()
  @IsObject()
  coverImage: {
    url: string;
  };

  @IsObject()
  @ApiProperty({
    example: {
      type: 'doc',
      content: [
        {
          type: 'dblock',
          content: [
            {
              type: 'heading',
              content: 'Notion Backend Clone'
            },
          ],
        },
      ],
    },
  })
  content: {
    type: string;
    content: any[];
  };
    
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Getting-Started-SubPage-1fa9e0d1fbc2804586d7e75a93b66e78'
  })
  reference?: string;

  @ApiProperty({
    example: ',Getting-Started-1fa9e0d1fbc2804586d7e75a93b66e78',
  })
  @IsOptional()
  @IsString()
  path?: string;


  @ApiProperty({
    example: '64aed7cc997d040c494aa94c',
  })
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @ApiProperty({
    example: '684a9bb9619c09e86b950954',
  })
  @IsOptional()
  @IsString()
  parentId?:string;
}

export class AddBlockDto {
  @ApiProperty({
    example: {
      type: 'doc',
      content: [
        {
          type: 'dblock',
          content: [
            {
              type: 'heading',
              content: 'Notion Backend Clone'
            },
          ],
        },
      ],
    },
  })
  @IsObject()
  content: {
    type: string;
    content: any[];
  };
}
