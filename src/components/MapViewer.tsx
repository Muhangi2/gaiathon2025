'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, Icon } from 'leaflet'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Feature as GeoJsonFeature, FeatureCollection, Polygon } from 'geojson'

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
  landCover?: string
}

type ZoneFeature = GeoJsonFeature<Polygon, ZoneProperties>

type FloodZonesGeoJSON = FeatureCollection<Polygon, ZoneProperties>

// Mock land cover GeoJSON for demo (not accurate)
const landCoverGeoJSON: FloodZonesGeoJSON = {
  type: 'FeatureCollection',
  features: [
    // Built-up area (red, covers most of Kampala)
    {
      type: 'Feature',
      properties: { name: 'Built-up Area', risk: 'high', landCover: 'builtup', population: 0, lastAlert: '' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [32.50, 0.28], [32.65, 0.28], [32.65, 0.40], [32.50, 0.40], [32.50, 0.28]
          ],
        ],
      },
    },
    // Vegetation patches (green)
    {
      type: 'Feature',
      properties: { name: 'Vegetation Patch 1', risk: 'low', landCover: 'vegetation', population: 0, lastAlert: '' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [32.54, 0.32], [32.56, 0.32], [32.56, 0.34], [32.54, 0.34], [32.54, 0.32]
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Vegetation Patch 2', risk: 'low', landCover: 'vegetation', population: 0, lastAlert: '' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [32.60, 0.36], [32.62, 0.36], [32.62, 0.38], [32.60, 0.38], [32.60, 0.36]
          ],
        ],
      },
    },
    // Water (Lake Victoria, blue, southeast)
    {
      type: 'Feature',
      properties: { name: 'Lake Victoria', risk: 'low', landCover: 'water', population: 0, lastAlert: '' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [32.60, 0.28], [32.65, 0.28], [32.65, 0.32], [32.60, 0.32], [32.60, 0.28]
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

const style = (feature?: GeoJsonFeature) => {
  const landCover = feature?.properties?.landCover
  let fillColor = '#ef4444' // default red
  if (landCover === 'vegetation') fillColor = '#22c55e' // green
  if (landCover === 'water') fillColor = '#60a5fa' // blue
  return {
    fillColor,
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '',
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

  const center: LatLngExpression = [1.3733, 32.2903] // Center on Uganda

  const filteredZones = landCoverGeoJSON.features.filter((zone) =>
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
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        maxBounds={[[-1.5, 29.5], [4.3, 35.0]]}
        maxBoundsViscosity={1.0}
        minZoom={7}
        maxZoom={13}
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
          data={landCoverGeoJSON}
          style={style}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`
              <b>${feature.properties.name}</b><br>
              Land Cover: ${feature.properties.landCover || 'N/A'}
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
              Land Cover: {selectedZone.properties.landCover || 'N/A'}
            </p>
          </Card>
        </div>
      )}
    </div>
  )
} 