import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from './file.service';
import { FileController } from './file.controller';
@Module({
    imports: [],
    providers: [
        PrismaService,
        FileService
    ],
    controllers: [FileController],
    exports: [PrismaService, FileService],
})
export class FileModule {}
