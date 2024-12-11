import TopNav from "@/components/topnav";
import CreateForm from "@/components/create-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <TopNav />
      <div className="p-20">
        <CreateForm />
      </div>
    </div>
  );
}
