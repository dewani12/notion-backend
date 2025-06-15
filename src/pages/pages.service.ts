import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

    async createPage(dto: CreatePageDto, userId: string): Promise<PageDocument> {
        const reference = generateReference(dto.title);
        const page = new this.pageModel({
            ...dto,
            reference,
            userId,
        });
        return page.save();
    }

    async getPageById(id: string): Promise<PageDocument> {
        const page = await this.pageModel.findById(id);
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async addSubPage(parentId: string, dto: CreatePageDto, userId: string): Promise<PageDocument> {
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

    async addBlock(pageId: string, content: { type: string; content: any[] }, userId: string): Promise<PageDocument> {
        const page = await this.getPageById(pageId);

        if (page.userId !== userId) {
            throw new ForbiddenException('You can only add blocks to your own pages');
        }

        const updatedPage = await this.pageModel.findByIdAndUpdate(
            pageId,
            {
                $push: {
                    'content.content': content
                }
            },
            { new: true }
        );

        if (!updatedPage) {
            throw new NotFoundException('Page not found');
        }

        return updatedPage;
    }

    async sharePage(pageId: string, memberIds: string[], userId: string): Promise<PageDocument> {
        const page = await this.getPageById(pageId);

        if (!page) {
            throw new NotFoundException('Page not found');
        }

        if (page.userId !== userId) {
            throw new ForbiddenException('Only the owner can share this page');
        }

        const updatedPage = await this.pageModel.findByIdAndUpdate(
            pageId,
            {
                $addToSet: { members: { $each: memberIds } },
            },
            { new: true }
        );

        if (!updatedPage) {
            throw new NotFoundException('Page not found');
        }

        return updatedPage;
    }
}
