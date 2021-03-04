import { Module } from '@nestjs/common';
import { PlayersModule } from './modules/players/players.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovesModule } from './modules/moves/moves.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const mergedOpts = {
          ...config.get('database'),
        };
        return mergedOpts;
      },
      inject: [ConfigService],
    }),
    PlayersModule,
    MovesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
