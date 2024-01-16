import { Controller, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { JwtPayload } from '../common/types/Jwt-Payload.type';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
    constructor(private folderService:FolderService) { }

    @Delete("/delete")
    @UseGuards(JwtAuthGuard)
    async deleteFile(@GetCurrentUser() user: JwtPayload, @Body() data: string) {
        return this.folderService.deleteFolder(user,data);
    }

    @Post("/rename")
    @UseGuards(JwtAuthGuard)
    async renameFile(@GetCurrentUser() user: JwtPayload,@Body() data: any) {
        return this.folderService.modifyFolder(user,data);
    }
    @Post("/add")
    @UseGuards(JwtAuthGuard)
    async addFile(@GetCurrentUser() user: JwtPayload, @Body() data: any) {
        console.log(user, data);
        return this.folderService.addFolder(user,data);
    }
}
