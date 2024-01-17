// export default FileUploadForm;
"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";

const FileUploadForm = (folderId: any) => {
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
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File>();
  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const fileData = new FormData();
      fileData.set("file", file);
  
      const metaData = {
        name: formData.name,
        description: formData.description,
        folderId: folderId.value,
      };
  
      // Use the fileData directly as the request body
      const res = await axiosInstance.post("/file/add", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: metaData, // Pass metaData as query parameters
      });
  
      console.log("File uploaded successfully:", res.data);
      setOpen(false);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new File</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4">
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
          <Input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadForm;
