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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFolders,deleteFolder } from "@/lib/api";
import { useRouter } from "next/navigation";
import FolderAddForm from "@/components/template/FolderAddForm";
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
  const deleteF = async(folderId: number) => {
    await deleteFolder(String(folderId));
  }
  function Dropdown({ folderId, onViewFiles }: DropdownProps) {
    const viewFilesHandler = () => {
      onViewFiles(folderId);
    };
    const deleteFolderHandler = () => {
      deleteF(folderId);
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={viewFilesHandler}>
            View Files
          </DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteFolderHandler}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
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
          {folders?.map((folder:any,index:number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{folder.name}</TableCell>
              <TableCell>{folder.description}</TableCell>
              <TableCell>{folder.files}</TableCell>
              <TableCell className="text-center" id={folder.id}>
                <Dropdown folderId={folder.id} onViewFiles={viewFiles} />
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
        <FolderAddForm/>
      </div>
      <div className="mx-20">
        <TableData />
      </div>
    </main>
  );
}
