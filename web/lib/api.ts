import { axiosInstance } from "./axiosInstance";

export async function createFolder(data: any) {
    await axiosInstance.post("/folder/add", data);
    return "created";
}

export async function deleteFolder(folderId:string) {
    const response = await axiosInstance.delete("/folder/delete", { params: { folderId: folderId } });
    console.log(response);
    return response;   
}

export async function renameFolder() {

}

export async function getFolders() {
    const folders=await axiosInstance.get("/folder/all");
    return folders;
}

export async function getFilesByFolderId(folderId:string) {
    const files = await axiosInstance.get("/file/all", {params: {folderId: folderId}});
    return files;
}

export async function renameFile() {

}

export async function deleteFile() {

}

export async function createFile() {

}

export async function moveFile() {

}