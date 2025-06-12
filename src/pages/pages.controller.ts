import { Controller, Post, Get, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { PagesService } from './pages.service';
import { CreatePageDto, AddBlockDto } from './dto';

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

  @Patch(':id/blocks')
  addBlock(@Param('id') pageId: string, @Body() dto: AddBlockDto, @User() user: any) {
    return this.pagesService.addBlock(pageId, dto.content, user.sub);
  }
}
