import Image from "next/image";
import { Files } from "@/components/template/dataTable";

export default function Home() {
  return (
    <main className="flex flex-row">
      <Files/>
    </main>
  );
}
