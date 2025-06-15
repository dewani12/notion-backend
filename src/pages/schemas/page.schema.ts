import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page {
    @ApiProperty({
        example: 'Montly Budget',
    })
    @Prop({ required: true })
    title: string;

    @ApiProperty({ example: '1f4ab' })
    @Prop()
    icon?: string;

    @ApiProperty({
        example: { url: 'http://img-url.com' },
    })
    @Prop(
        raw({
            url: { type: String },
        })
    )
    coverImage:{ 
        url: string
    };

    @ApiProperty({
        example: {
            type: 'doc',
            content: [],
        },
    })
    @Prop(
        raw({
            type: { type: String },
            content: { type: [Object] },
        })
    )
    content: {
        type: string;
        content: any[];
    };

    @Prop({default: null})
    parentId?: string;

    @Prop()
    userId: string;

    @Prop()
    reference: string;

    @Prop()
    path: string

    @Prop()
    workspaceId: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
