import { Controller, Post, Get, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { PagesService } from './pages.service';
import { CreatePageDto, AddBlockDto, SharePageDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) { }

  @Post()
  createPage(@Body() dto: CreatePageDto, @User() user: any) {
    return this.pagesService.createPage(dto, user.sub);
  }

  @Get(':id')
  getPageById(@Param('id') id: string) {
    return this.pagesService.getPageById(id);
  }

  @Post(':id/subpage')
  addSubPage(@Param('id') parentId: string, @Body() dto: CreatePageDto, @User() user: any) {
    return this.pagesService.addSubPage(parentId, dto, user.sub);
  }

  @Patch(':id/content')
  addBlock(@Param('id') pageId: string, @Body() dto: AddBlockDto, @User() user: any) {
    return this.pagesService.addBlock(pageId, dto.content, user.sub);
  }

  @Patch(':id/share')
  async sharePage(@Param('id') id: string,@Body() sharePageDto: SharePageDto,@User() user: any ) {
    return this.pagesService.sharePage(id, sharePageDto.memberIds, user.sub);
  }
}