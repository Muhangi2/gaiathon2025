'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
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

const MapViewer = dynamic(() => import('@/components/MapViewer'), { ssr: false })

export default function Dashboard() {
  const [currentAlert, setCurrentAlert] = useState(alerts[0])

  return (
    <div className="flex h-screen">
      {/* Map Section */}
      <div className="flex-1">
        <MapViewer />
      </div>

      {/* Sidebar */}
      <div className="w-96 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Current Alerts</h2>
        
        {/* Current Alert Card */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Current Alert</h3>
            <Badge className={getSeverityColor(currentAlert.severity)}>
              {currentAlert.severity}
            </Badge>
          </div>
          <p className="text-gray-600 mb-2">{currentAlert.location}</p>
          <p className="text-sm text-gray-500">
            {new Date(currentAlert.timestamp).toLocaleString()}
          </p>
        </Card>

        {/* Alert History */}
        <h3 className="font-semibold mb-4">Alert History</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setCurrentAlert(alert)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{alert.location}</h4>
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
    </div>
  )
} 