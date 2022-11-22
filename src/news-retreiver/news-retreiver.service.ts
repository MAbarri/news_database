import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticleService } from "../api/article/article.service"

@Injectable()
export class NewsRetreiverService {
    constructor(private articleService: ArticleService){}
    
    @Cron('1 0 * * * *')
    async handleCron() {
        console.log('Called when the current second is 45');
        await this.articleService.scrapNewsData("sa", "general")
        await this.articleService.scrapNewsData("sa", "business")
        await this.articleService.scrapNewsData("sa", "sports")
    }
}
