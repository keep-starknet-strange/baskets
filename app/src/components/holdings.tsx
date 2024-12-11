'use-client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'


export default function HoldingsTab() {
    const holdings = [
      { name: 'Bitcoin', value: 40 },
      { name: 'Ethereum', value: 30 },
      { name: 'Cardano', value: 10 },
      { name: 'Polkadot', value: 10 },
      { name: 'Others', value: 10 },
    ]
  
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fund Holdings</CardTitle>
          <CardDescription>Current asset allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={holdings}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {holdings.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Allocation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdings.map((holding, index) => (
                    <TableRow key={index}>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell>{holding.value}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }