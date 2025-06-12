import { IsString, IsOptional, IsObject, IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsObject()
  coverImage: {
    url: string;
  };

  @IsObject()
  content: {
    type: string;
    content: any[];
  };
    
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @IsOptional()
  @IsString()
  parentId?:string;
}
