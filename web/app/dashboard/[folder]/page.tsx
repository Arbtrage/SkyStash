"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface ProfileFormProps {
  className?: string;
}

interface DropdownProps {
  fileId: number;
  onViewFiles: (fileId: number) => void;
}

export default function Home() {
  const currentPage = usePathname();

  const router = useRouter();

  const viewFile = (fileId: number) => {
    console.log(`View files for folder with ID: ${fileId}`);
    router.push(`/dashboard/${fileId}`);
  };

  function FolderModal({ className }: ProfileFormProps) {
    const addFolder = async (event: any) => {
      event.preventDefault();
      console.log(formData);
    };
    const [formData, setFormData] = useState({
      name: "",
      description: "",
    });
    const handleInputChange = (e: any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    return (
      <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Folder Name</Label>
          <Input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Folder Description</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={addFolder}>Add</Button>
      </form>
    );
  }
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
    const [files, setFiles] = useState([]);

    useEffect(() => {
      getFilesByFolderId().then((res:any) => {
        setFiles(res);
      });
    }, []);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl. No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-center">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.id}</TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.description}</TableCell>
              <TableCell>{file.type}</TableCell>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add File</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New File</DialogTitle>
              <DialogDescription>
                Make changes to your file here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <FolderModal />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-20">
        <TableData />
      </div>
    </main>
  );
}
