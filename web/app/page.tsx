import Image from "next/image";
import { Auth } from "@/components/template/auth";

export default function Home() {
  return (
    <main className="flex flex-row">
      <section className="hidden md:block md:w-1/3 bg-gray-400 text-center p-40"></section>
      <section className="w-full md:w-2/3 content-center flex min-h-screen flex-col items-center justify-between p-24">
        <Auth />
      </section>
    </main>
  );
}
