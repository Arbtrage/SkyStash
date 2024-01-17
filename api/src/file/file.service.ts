import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PrismaService } from '../prisma/prisma.service';

interface FileData {
    name: string;
    description: string;
    FolderId: string;
  }
@Injectable()
export class FileService {
    constructor(
        private prisma: PrismaService,
    ) { }
    async addFile(file: any, fileData: any) {
        console.log(fileData)
        try {
            const fileBucket = admin.storage().bucket();
            const fileName = file.originalname;
            const fileUpload = fileBucket.file(fileName);
            const res = await fileUpload.save(file.buffer, {
                metadata: {
                    contentType: file.mimetype,
                },
            });
            await this.prisma.file.create({
                data: {
                    name: fileData.name,
                    description: fileData.description,
                    path: `https://storage.googleapis.com/${fileBucket.name}/${fileUpload.name}`,
                    Folder: {
                        connect: {
                            id: fileData.folderId,
                        },
                    },
                },
            });
            return "File upload success";
        } catch (error) {
            console.error('Error uploading file to Firebase Cloud Storage:', error);
            throw new BadRequestException('Failed to upload file.');
        }
    }
    async getFile(data: any) {
        try {
            const fileBucket = admin.storage().bucket();
            const file = fileBucket.file(data.fileName);

            // Check if the file exists
            const [exists] = await file.exists();
            if (!exists) {
                throw new NotFoundException('File not found.');
            }

            // Generate a signed URL for temporary access
            const signedUrl = await file.getSignedUrl({
                action: 'read',
                expires: '03-17-2024', // Adjust the expiration date as needed
            });

            return signedUrl[0];
        } catch (error) {
            console.error('Error retrieving file from Firebase Cloud Storage:', error);
            throw new BadRequestException('Failed to retrieve file.');
        }
    }
    async modifyFile(data: any) {
        try {
            const fileBucket = admin.storage().bucket();
            const file = fileBucket.file(data.oldFileName);

            // Check if the file exists
            const [exists] = await file.exists();
            if (!exists) {
                throw new NotFoundException('File not found.');
            }

            // Update the file metadata to change the name
            await file.setMetadata({
                metadata: {
                    // Update other metadata properties if needed
                },
                contentDisposition: `inline; filename="${data.newFileName}"`,
            });

            // Generate a signed URL for temporary access to the modified file
            const signedUrl = await file.getSignedUrl({
                action: 'read',
                expires: '03-17-2024', // Adjust the expiration date as needed
            });

            return signedUrl[0];
        } catch (error) {
            console.error('Error modifying file in Firebase Cloud Storage:', error);
            throw new BadRequestException('Failed to modify file.');
        }
    }
    async deleteFile(data: any) {
        try {
            const fileBucket = admin.storage().bucket();
            const file = fileBucket.file(data.fileName);

            // Check if the file exists
            const [exists] = await file.exists();
            if (!exists) {
                throw new NotFoundException('File not found.');
            }

            // Delete the file
            await file.delete();

            return 'File deleted successfully.';
        } catch (error) {
            console.error('Error deleting file from Firebase Cloud Storage:', error);
            throw new BadRequestException('Failed to delete file.');
        }
    }
    async getAllFiles(folderId: string) {
        try {
            const files = await this.prisma.file.findMany({
                where: {
                    FolderId: folderId,
                },
            });
            return files;
        } catch (error) {
            console.error('Error retrieving files:', error);
            throw new BadRequestException('Failed to retrieve files.');
        }
    }
}
