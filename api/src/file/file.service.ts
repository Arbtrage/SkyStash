import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes, scrypt } from 'crypto';


@Injectable()
export class FileService {
    constructor(
        private prisma: PrismaService,
    ) { }
    async addFile(data:any) {

    }
    async modifyFile(data: any) { }
    async deleteFile(data: any) { }
}
