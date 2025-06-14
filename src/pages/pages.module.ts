import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';

@Module({
  imports: [MongooseModule.forFeature([ {name: Page.name, schema: PageSchema} ])],
  providers: [PagesService],
  controllers: [PagesController]
})
export class PagesModule {}
