import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateArticleDto } from './article.dto';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {

    @Inject(ArticleService)
    private readonly service: ArticleService;

    @Get()
    public getAllArticles(): Promise<Article[]> {
        return this.service.getAllArticle();
    }
    @Get("callapi/:lang/:keyword")
    public testScrapping(@Param('lang') lang, @Param('keyword') keyword) {
        this.service.scrapNewsData(lang, keyword);
    }

    @Get(':id')
    public getArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
        return this.service.getArticle(id);
    }

    @Post()
    public createArticle(@Body() body: CreateArticleDto): Promise<Article> {
        return this.service.createArticle(body);
    }


}
