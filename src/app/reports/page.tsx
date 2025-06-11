'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

// Placeholder data for charts
const monthlyData = [
  { month: 'Jan', alerts: 12 },
  { month: 'Feb', alerts: 19 },
  { month: 'Mar', alerts: 15 },
  { month: 'Apr', alerts: 8 },
  { month: 'May', alerts: 23 },
  { month: 'Jun', alerts: 17 },
]

const riskZoneData = [
  { zone: 'Zone A', risk: 85 },
  { zone: 'Zone B', risk: 65 },
  { zone: 'Zone C', risk: 45 },
  { zone: 'Zone D', risk: 30 },
  { zone: 'Zone E', risk: 20 },
]

export default function Reports() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>

      <div className="grid gap-8">
        {/* Monthly Alerts Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Alert Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Risk Level Trends */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Risk Level Trends</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskZoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Alerts</h3>
            <p className="text-3xl font-bold text-blue-600">94</p>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Average Response Time</h3>
            <p className="text-3xl font-bold text-green-600">2.5h</p>
            <p className="text-sm text-gray-500">From alert to action</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">High Risk Areas</h3>
            <p className="text-3xl font-bold text-red-600">5</p>
            <p className="text-sm text-gray-500">Currently monitored</p>
          </Card>
        </div>
      </div>
    </div>
  )
} 