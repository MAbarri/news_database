import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './article.dto';
import { Article } from './article.entity';
import * as _ from "underscore";
import * as async from "async";

const axios = require("axios");


@Injectable()
export class ArticleService {
    @InjectRepository(Article)
    private readonly repository: Repository<Article>;

    public getAllArticle(): Promise<Article[]> {
        return this.repository.find();
    }

    public getArticle(id: any): Promise<Article> {
        return this.repository.findOne(id);
    }

    public createArticle(body: CreateArticleDto): Promise<Article> {
        const article: Article = new Article();

        article.title = body.title;
        // article.heroURL = body.heroURL;

        return this.repository.save(article);
    }

    findArticle(articleurl): Promise<any>{
        return this.repository.findOne({ where: { sourceURL : articleurl}});
    }


    public scrapNewsData(lang, keyword) {

        
        const options = {
            method: 'GET',
            url: 'https://newsapi.org/v2/top-headlines?country=sa&category=sports&pageSize=100',
            headers: {
                'X-Api-Key': 'dbe25773eee642da8aa0b07903b56c92'
            }
        };

        axios.request(options).then(response => {
            console.log("results : ",response.data.articles.length);
            this.insertNewArticles(response.data.articles)
        }).catch(function (error) {
            console.error(error);
        });
    }

    insertNewArticles(articlesArray){


        async.eachSeries(
            articlesArray,
            async _article => {
                let existingArticle = await this.findArticle(_article.url);
                if (!existingArticle && !!_article.url && !!_article.urlToImage) {
                    let newArticle = new Article();
                    newArticle.title = _article.title;
                    newArticle.articleDate = _article.publishedAt;
                    newArticle.author = _article.author || _article.source.name;
                    newArticle.content = _article.description;
                    newArticle.heroURL = _article.urlToImage;
                    newArticle.source = _article.source.name;
                    newArticle.sourceURL = _article.url;
                    newArticle.lang = "en";
                    newArticle.country = "sa";
                    newArticle.category = "sports";

                    console.log('saving new Article');
                    await this.repository.save(newArticle);
                } 
                // else {
                //     console.log('_article.url', !!_article.url, _article.url)

                // }
                Promise.resolve() // <-- instead of callback
            },
            err => {
                console.log('err:', err)
            }
        )
            console.log('FINISHED ?')

    }
}