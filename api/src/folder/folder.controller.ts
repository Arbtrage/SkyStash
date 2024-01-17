import { Controller, Post, Query, Get, UseGuards, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtPayload } from '../common/types/Jwt-Payload.type';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
    constructor(private folderService: FolderService) { }

    @Delete("/delete")
    @UseGuards(JwtAuthGuard)
    async deleteFolder(@Query('folderId') folderId: string) {
        return this.folderService.deleteFolder(folderId);
    }

    @Post("/rename")
    @UseGuards(JwtAuthGuard)
    async renameFolder(@Body() data: any) {
        return this.folderService.modifyFolder(data);
    }
    @Post("/add")
    @UseGuards(JwtAuthGuard)
    async addFolder(@GetCurrentUser() user: JwtPayload, @Body() data: any) {
        console.log(user, data);
        return this.folderService.addFolder(user, data);
    }
    @Get("/all")
    @UseGuards(JwtAuthGuard)
    async getAllFolders(@GetCurrentUser() user: JwtPayload) {
        console.log(user);
        return this.folderService.getAllFolders(user);
    }
}
