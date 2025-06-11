'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Placeholder alert data
const alerts = [
  {
    id: 1,
    location: 'High Risk Zone 1',
    severity: 'high',
    timestamp: '2024-03-20T10:30:00Z',
    source: 'Satellite observation',
  },
  {
    id: 2,
    location: 'Medium Risk Zone 1',
    severity: 'medium',
    timestamp: '2024-03-20T09:15:00Z',
    source: 'Satellite observation',
  },
  {
    id: 3,
    location: 'Low Risk Zone 1',
    severity: 'low',
    timestamp: '2024-03-20T08:00:00Z',
    source: 'Satellite observation',
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export default function Alerts() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Alert History</h1>
      
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{alert.location}</h3>
                <p className="text-gray-600">Source: {alert.source}</p>
              </div>
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
} 