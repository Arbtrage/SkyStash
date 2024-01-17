"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFolders, deleteFolder } from "@/lib/api";
import { useRouter } from "next/navigation";
import FolderAddForm from "@/components/template/FolderAddForm";
import RenameForm from "@/components/template/Rename";

interface DropdownProps {
  folderId: number;
  onViewFiles: (folderId: number) => void;
}
export default function Home() {
  const router = useRouter();
  const [folders, setFolders] = useState<any>();
  useEffect(() => {
    getFolders().then((res: any) => {
      setFolders(res.data);
    });
  }, []);

  const viewFiles = (folderId: number) => {
    console.log(`View files for folder with ID: ${folderId}`);
    router.push(`/dashboard/${folderId}`);
  };
  const deleteF = async (folderId: number) => {
    await deleteFolder(String(folderId));
  };
  function TableData() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl. No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="text-center">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders?.map((folder: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{folder.name}</TableCell>
              <TableCell>{folder.description}</TableCell>
              <TableCell>{folder.files}</TableCell>
              <TableCell className="flex flex-row gap-2 justify-center" id={folder.id}>
                <Button variant={"outline"} onClick={() => viewFiles(folder.id)}>Open</Button>
                <RenameForm folderId={folder.id} type={"folder"} />
                <Button variant={"destructive"} onClick={() => deleteF(folder.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return (
    <main className="flex flex-col">
      <div className="w-full flex justify-between mb-10">
        <div>Hello</div>
        <FolderAddForm />
      </div>
      <div className="mx-20">
        <TableData />
      </div>
    </main>
  );
}
