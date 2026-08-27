'use client'

import { palette } from '@/styles/tokens'
import { useCallback } from 'react'
import React from 'react'

import 'leaflet/dist/leaflet.css'

/**
 * OpenStreetMap view of the studio.
 *
 * Leaflet is loaded on demand from a ref callback, so it never reaches the
 * server bundle and only downloads once the node exists. Scroll-wheel zoom
 * starts disabled so the map does not hijack page scrolling — a click enables it.
 */
export const StudioMap: React.FC<{
  lat: number
  lon: number
  label: string
  address: string
}> = ({ lat, lon, label, address }) => {
  const mount = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return

      let map: import('leaflet').Map | undefined
      let cancelled = false

      void import('leaflet').then(({ default: L }) => {
        if (cancelled) return

        map = L.map(node, { scrollWheelZoom: false }).setView([lat, lon], 16)

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        L.circleMarker([lat, lon], {
          radius: 9,
          color: palette.clayDeep,
          weight: 2,
          fillColor: palette.clay,
          fillOpacity: 0.9,
        })
          .addTo(map)
          .bindPopup(`<strong>${label}</strong><br>${address}`)
          .openPopup()

        map.on('click', () => map?.scrollWheelZoom.enable())
      })

      return () => {
        cancelled = true
        map?.remove()
      }
    },
    [lat, lon, label, address],
  )

  return (
    <div
      ref={mount}
      aria-label="Studio location map"
      className="z-0 h-[340px] rounded-md border border-line bg-cream-card md:h-[460px]"
    />
  )
}
