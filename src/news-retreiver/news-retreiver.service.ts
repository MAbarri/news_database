import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticleService } from "../api/article/article.service"

@Injectable()
export class NewsRetreiverService {
    constructor(private articleService: ArticleService){}
    
    @Cron('1 0 * * * *')
    handleCron() {
        console.log('Called when the current second is 45');
        this.articleService.scrapNewsData("", "");
    }
}
