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
import { getFilesByFolderId } from "@/lib/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import FileUploadForm from "@/components/template/FileUploadForm";

interface ProfileFormProps {
  className?: string;
}

interface DropdownProps {
  fileId: number;
  onViewFiles: (fileId: number) => void;
}

export default function Home() {
  const currentPage = usePathname();
  const url = currentPage;
  const dashboardIndex = url.indexOf("/dashboard/");
  let itemId = "";
  if (dashboardIndex !== -1) {
    itemId = url.slice(dashboardIndex + "/dashboard/".length);
    console.log(itemId); // This will print '1'
  } else {
    console.log("Invalid URL format");
  }

  const router = useRouter();

  const viewFile = (fileId: number) => {
    console.log(`View files for folder with ID: ${fileId}`);
    router.push(`/dashboard/${fileId}`);
  };

    function Dropdown({ fileId, onViewFiles }: DropdownProps) {
    const viewFilesHandler = () => {
      onViewFiles(fileId);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={viewFilesHandler}>View</DropdownMenuItem>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Move</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  function TableData() {
    const [files, setFiles] = useState<any>();

    useEffect(() => {
      getFilesByFolderId(itemId).then((res:any) => {
        setFiles(res.data);
      });
    }, []);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl. No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files?.map((file:any,index:any) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.description}</TableCell>
              <TableCell className="text-center" id={file.id}>
                <Dropdown fileId={file.id} onViewFiles={viewFile} />
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
          <FileUploadForm value={itemId} />
      </div>
      <div className="mx-20">
        <TableData />
      </div>
    </main>
  );
}
