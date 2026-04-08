import { Outlet, useParams } from 'react-router-dom'
import { getDeal } from '../data/deals'

export default function DealDetail() {
  const { dealId } = useParams()
  const deal = getDeal(dealId)

  if (!deal) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Deal not found</p>
      </div>
    )
  }

  return <Outlet />
}
