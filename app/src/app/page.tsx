import Dashboard from "@/components/dashboard";
import TopNav from "@/components/topnav";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <TopNav />
      <Dashboard />
    </main>
  );
}
