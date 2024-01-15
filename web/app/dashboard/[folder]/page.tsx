
import { Files } from "@/components/template/dataTable";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-between my-5">
        <div className="flex flex-col">
          <h1>Title</h1>
          <h3>Description</h3>
        </div>
        <Button>Add new File</Button>
      </div>
      <Files />
    </main>
  );
}
