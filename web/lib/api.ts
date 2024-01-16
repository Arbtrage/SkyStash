import { axiosInstance } from "./axiosInstance";

export async function createFolder() {

}

export async function deleteFolder() {

}

export async function renameFolder() {

}

export async function getFolders() {
    return [{ id: 1, name: "Hfsd", description: "asdasd", files: 5 }, { id: 2, name: "Hfsd", description: "asdasd", files: 5 }];
}

export async function getFilesByFolderId() {
    return [{ id: 1, name: "Hfsd", description: "asdasd", type:'pdf' }, { id: 2, name: "Hfsd", description: "asdasd", type:'image' }];
}

export async function renameFile() {

}

export async function deleteFile() {

}

export async function createFile() {

}

export async function moveFile() {

}