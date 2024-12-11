import { PlusCircle, MinusCircle } from 'lucide-react'

export default function ActionButtons() {
  return (
    <div className="flex justify-center space-x-4">
      <button className="w-40 btn">
        <PlusCircle className="mr-2 h-4 w-4" />
        Deposit
      </button>
      <button className="w-40 btn">
        <MinusCircle className="mr-2 h-4 w-4" />
        Withdraw
      </button>
    </div>
  )
}

