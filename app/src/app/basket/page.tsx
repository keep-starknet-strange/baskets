import Header from "@/components/header";
import ActionButtons from "@/components/action-buttons";
import TopNav from "@/components/topnav";
// import Holdings from "@/components/holdings";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <TopNav />
      <div className="p-20">
        <Header />
        <ActionButtons />
        {/* <Holdings /> */}
      </div>
    </div>
  );
}
