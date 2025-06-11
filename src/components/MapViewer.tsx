'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, Icon, Feature, GeoJSON as GeoJSONType } from 'leaflet'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Fix for default marker icons in Next.js
const icon = new Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface ZoneProperties {
  name: string
  risk: 'high' | 'medium' | 'low'
  population: number
  lastAlert: string
}

interface ZoneFeature extends Feature {
  properties: ZoneProperties
}

interface FloodZonesGeoJSON extends GeoJSONType.FeatureCollection {
  features: ZoneFeature[]
}

// Placeholder GeoJSON data for flood-prone areas
const floodZonesGeoJSON: FloodZonesGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'High Risk Zone 1',
        risk: 'high',
        population: 15000,
        lastAlert: '2024-03-20T10:30:00Z',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [51.505, -0.09],
            [51.51, -0.1],
            [51.51, -0.12],
            [51.505, -0.12],
            [51.505, -0.09],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Medium Risk Zone 1',
        risk: 'medium',
        population: 8000,
        lastAlert: '2024-03-19T15:45:00Z',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [51.515, -0.09],
            [51.52, -0.1],
            [51.52, -0.12],
            [51.515, -0.12],
            [51.515, -0.09],
          ],
        ],
      },
    },
  ],
}

interface MonitoringStation {
  id: number
  name: string
  position: LatLngExpression
  status: 'active' | 'inactive'
  lastReading: string
}

// Placeholder monitoring stations
const monitoringStations: MonitoringStation[] = [
  {
    id: 1,
    name: 'Station Alpha',
    position: [51.507, -0.11],
    status: 'active',
    lastReading: '2024-03-20T11:00:00Z',
  },
  {
    id: 2,
    name: 'Station Beta',
    position: [51.517, -0.11],
    status: 'active',
    lastReading: '2024-03-20T11:00:00Z',
  },
]

const getColorByRisk = (risk: string) => {
  switch (risk) {
    case 'high':
      return '#ef4444'
    case 'medium':
      return '#f59e0b'
    case 'low':
      return '#10b981'
    default:
      return '#6b7280'
  }
}

const style = (feature: ZoneFeature) => {
  return {
    fillColor: getColorByRisk(feature.properties.risk),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  }
}

export default function MapViewer() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedZone, setSelectedZone] = useState<ZoneFeature | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const center: LatLngExpression = [51.505, -0.09]

  const filteredZones = floodZonesGeoJSON.features.filter((zone) =>
    zone.properties.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      {/* Search Overlay */}
      <div className="absolute top-4 left-4 z-[1000] w-64">
        <Card className="p-4">
          <Input
            type="text"
            placeholder="Search zones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          {searchQuery && (
            <div className="max-h-48 overflow-y-auto">
              {filteredZones.map((zone) => (
                <div
                  key={zone.properties.name}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedZone(zone)}
                >
                  {zone.properties.name}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <GeoJSON
          data={floodZonesGeoJSON}
          style={style}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`
              <b>${feature.properties.name}</b><br>
              Risk Level: ${feature.properties.risk}<br>
              Population: ${feature.properties.population}<br>
              Last Alert: ${new Date(feature.properties.lastAlert).toLocaleString()}
            `)
          }}
        />

        {monitoringStations.map((station) => (
          <Marker
            key={station.id}
            position={station.position}
            icon={icon}
          >
            <Popup>
              <b>{station.name}</b><br />
              Status: {station.status}<br />
              Last Reading: {new Date(station.lastReading).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Selected Zone Info */}
      {selectedZone && (
        <div className="absolute bottom-4 right-4 z-[1000] w-64">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">{selectedZone.properties.name}</h3>
            <p className="text-sm text-gray-600">
              Risk Level: {selectedZone.properties.risk}<br />
              Population: {selectedZone.properties.population}<br />
              Last Alert: {new Date(selectedZone.properties.lastAlert).toLocaleString()}
            </p>
          </Card>
        </div>
      )}
    </div>
  )
} 