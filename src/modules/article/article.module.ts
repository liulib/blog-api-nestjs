import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { vLogModule } from '@/modules/vLog/vLog.module';
import { CommentModule } from '@/modules/comment/comment.module';

@Module({
  imports: [
    vLogModule,
    TagModule,
    CategoryModule,
    CommentModule,
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
