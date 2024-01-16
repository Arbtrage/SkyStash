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
import { getFolders } from "@/lib/api";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  className?: string;
}

interface DropdownProps {
  folderId: number;
  onViewFiles: (folderId: number) => void;
}

export default function Home() {

  const router = useRouter();
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    getFolders().then((res:any) => {
      setFolders(res);
    });
  }, []);

  
  const viewFiles = (folderId: number) => {
    console.log(`View files for folder with ID: ${folderId}`);
    router.push(`/dashboard/${folderId}`);
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
  function Dropdown({ folderId, onViewFiles }: DropdownProps) {
    const viewFilesHandler = () => {
      onViewFiles(folderId);
    };

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
          <DropdownMenuItem>Delete</DropdownMenuItem>
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
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell className="font-medium">{folder.id}</TableCell>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Folder</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Folder</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
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
