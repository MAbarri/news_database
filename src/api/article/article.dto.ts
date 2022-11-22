import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    public title: string;
}