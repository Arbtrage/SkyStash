import { Controller, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtPayload } from '../common/types/Jwt-Payload.type';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService:FileService) { }

    @Delete("/delete")
    @UseGuards(JwtAuthGuard)
    async deleteFile(@GetCurrentUser() user: JwtPayload) {
        return this.fileService.deleteFile(user);
    }

    @Post("/rename")
    @UseGuards(JwtAuthGuard)
    async renameFile(@GetCurrentUser() user: JwtPayload) {
        return this.fileService.modifyFile(user);
    }
    @Post("/add")
    @UseGuards(JwtAuthGuard)
    async addFile(@GetCurrentUser() user: JwtPayload) {
        return this.fileService.addFile(user);
    }
}
