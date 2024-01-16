import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
@Module({
    imports: [],
    providers: [
        PrismaService,
        FolderService
    ],
    controllers: [FolderController],
    exports: [PrismaService, FolderService],
})
export class FolderModule { }
