import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ActivityService } from './activity/activity.service';
import { ActivityModule } from './activity/activity.module';
import { ArtifactModule } from './artifact/artifact.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ActivityModule, ArtifactModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ActivityService],
})
export class AppModule {
}
