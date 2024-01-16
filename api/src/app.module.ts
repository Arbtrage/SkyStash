import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [UserModule, AuthModule,CommonModule ,ConfigModule.forRoot(), FolderModule, FileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,CommonModule],
})
export class AppModule {}
