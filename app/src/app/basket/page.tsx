import Header from '@/components/header'
import ActionButtons from '@/components/action-buttons'
import TopNav from '@/components/topnav'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <TopNav />
      <div className="p-20">
        <Header />
        <ActionButtons />
      </div>
    </div>
  )
}