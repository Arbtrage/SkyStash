import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo(name:any) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span>{name}</span>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
