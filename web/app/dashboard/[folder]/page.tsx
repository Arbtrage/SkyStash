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
import RenameForm from "@/components/template/Rename";
import { getFilesByFolderId } from "@/lib/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import FileUploadForm from "@/components/template/FileUploadForm";


export default function Home() {
  const currentPage = usePathname();
  const url = currentPage;
  const dashboardIndex = url.indexOf("/dashboard/");
  let itemId = "";
  if (dashboardIndex !== -1) {
    itemId = url.slice(dashboardIndex + "/dashboard/".length);
    console.log(itemId);
  } else {
    console.log("Invalid URL format");
  }

  const router = useRouter();

  const viewFile = (fileId: number) => {
    console.log(`View files for folder with ID: ${fileId}`);
    router.push(`/dashboard/${fileId}`);
  };
  function TableData() {
    const [files, setFiles] = useState<any>();

    useEffect(() => {
      getFilesByFolderId(itemId).then((res: any) => {
        setFiles(res.data);
      });
    }, []);
    const viewFile = (fileId: number) => {
      console.log(`View files for folder with ID: ${fileId}`);
    };
    const deleteF = (fileId: number) => {
      console.log("Delete File with ID: " + fileId);
    }
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
          {files?.map((file: any, index: any) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.description}</TableCell>
              <TableCell className="flex flex-row gap-2 justify-center" id={file.id}>
                <Button
                  variant={"outline"}
                  onClick={() => viewFile(file.id)}
                >
                  Open
                </Button>
                <RenameForm folderId={file.id} type={"file"} />
                <Button
                  variant={"destructive"}
                  onClick={() => deleteF(file.id)}
                >
                  Delete
                </Button>
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
