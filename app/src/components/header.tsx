import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-4">Lucas's Dumbshit Index</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Value" value="$1,234,567" icon={<DollarSign className="h-6 w-6" />} />
        <MetricCard title="24h Change" value="+5.67%" icon={<TrendingUp className="h-6 w-6 text-green-500" />} />
        <MetricCard title="7d Change" value="-2.34%" icon={<TrendingDown className="h-6 w-6 text-red-500" />} />
        <MetricCard title="Assets" value="15" />
      </div>
    </header>
  )
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

