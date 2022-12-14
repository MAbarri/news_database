import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsRetreiverService } from './news-retreiver/news-retreiver.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }) ,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ScheduleModule.forRoot(),
    ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}