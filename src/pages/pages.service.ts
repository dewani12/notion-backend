import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto';
import { generateReference, generatePath } from './utils/page.util';

@Injectable()
export class PagesService {
    constructor(
        @InjectModel(Page.name) private pageModel: Model<PageDocument>,
    ) { }

    async createPage(dto: CreatePageDto, userId: string): Promise<Page> {
        const reference = generateReference(dto.title);
        const page = new this.pageModel({
            ...dto,
            reference,
            userId,
        });
        return page.save();
    }

    async getPageById(id: string): Promise<Page> {
        const page = await this.pageModel.findById(id);
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async addSubPage(parentId: string, dto: CreatePageDto, userId: string): Promise<Page> {
        const parentPage = await this.getPageById(parentId);
        const path = generatePath(parentPage.path, parentPage.reference); // fix - path should be reverse from closest node to root 
        const reference = generateReference(dto.title);

        const subPage = new this.pageModel({
            ...dto,
            path,
            reference,
            userId,
            parentId
        });

        return subPage.save();
    }
}
