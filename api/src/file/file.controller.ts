import {
    Controller, UseGuards, Body, Delete,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Get,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtPayload } from '../common/types/Jwt-Payload.type';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) { }
    @Get("/all")
    @UseGuards(JwtAuthGuard)
    async getAllFiles(@Query('folderId') folderId: string) {
        return this.fileService.getAllFiles(folderId);
    }


    @Delete("/delete")
    @UseGuards(JwtAuthGuard)
    async deleteFile(@Query('folderId') folderId: string) {
        return this.fileService.deleteFile(folderId);
    }

    @Post("/rename")
    @UseGuards(JwtAuthGuard)
    async renameFile(@GetCurrentUser() user: JwtPayload) {
        return this.fileService.modifyFile(user);
    }
    @Post("/add")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addFile(@UploadedFile(
        new ParseFilePipe({
            validators: [new MaxFileSizeValidator({ maxSize: 2 * 1000 * 1000 })],
        }),
    )
    file: Express.Multer.File,
        @Query('name') name: string,
        @Query('description') description: string,
        @Query('folderId') folderId: string,
    ) {
        const metaData = {
            name,
            description,
            folderId,
        };
        return this.fileService.addFile(file,
            metaData)
    }
}
