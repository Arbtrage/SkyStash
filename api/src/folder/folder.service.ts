import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FolderService {
    constructor(private prisma: PrismaService) {}

    async addFolder(user: any, data: any) {
        try {
            const userData = await this.prisma.auth.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    id: true,
                    User: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!userData || !userData.User) {
                throw new NotFoundException('User not found.');
            }

            await this.prisma.folder.create({
                data: {
                    name: data.name,
                    description: data.description,
                    User: {
                        connect: {
                            id: userData.User.id,
                        },
                    },
                },
            });
        } catch (error) {
            // Handle errors, log, and optionally rethrow
            console.error('Error adding folder:', error);
            throw new NotFoundException('Failed to add folder.');
        }
    }

    async modifyFolder(user: any, data: any) {
        try {
            await this.prisma.folder.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                    description: data.description,
                },
            });
        } catch (error) {
            // Handle errors, log, and optionally rethrow
            console.error('Error modifying folder:', error);
            throw new NotFoundException('Failed to modify folder.');
        }
    }

    async deleteFolder(user: any, data: string) {
        try {
            await this.prisma.folder.delete({
                where: {
                    id: data,
                },
            });
        } catch (error) {
            // Handle errors, log, and optionally rethrow
            console.error('Error deleting folder:', error);
            throw new NotFoundException('Failed to delete folder.');
        }
    }
}
