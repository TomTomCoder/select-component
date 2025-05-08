"use client"

import { useState } from "react"
import { Select } from "@/components/ui/select"
import { BasicSelect } from "@/components/ui/basic-select"
import { ScrollableSelect } from "@/components/ui/scrollable-select"

export default function Home() {
  const [fruit, setFruit] = useState("")
  const [timezone, setTimezone] = useState("")
  const [color, setColor] = useState("")

  // Custom options with descriptions
  const colorOptions = [
    {
      label: "Red",
      value: "red",
      description: "The color of passion and energy",
    },
    {
      label: "Blue",
      value: "blue",
      description: "The color of calm and serenity",
    },
    {
      label: "Green",
      value: "green",
      description: "The color of nature and growth",
    },
    {
      label: "Yellow",
      value: "yellow",
      description: "The color of happiness and optimism",
    },
    {
      label: "Purple",
      value: "purple",
      description: "The color of luxury and creativity",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-12">
        <h1 className="text-3xl font-bold text-center">Improved Select Components</h1>
        <p className="text-center text-gray-500">Portable, customizable, and easy to import into any project</p>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Basic Select</h2>
          <div className="space-y-4">
            <BasicSelect value={fruit} onChange={setFruit} className="w-full max-w-xs" label="Select a fruit" />
            {fruit && (
              <p className="text-sm">
                You selected: <span className="font-medium">{fruit}</span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Scrollable Select</h2>
          <div className="space-y-4">
            <ScrollableSelect value={timezone} onChange={setTimezone} className="w-full" label="Select a timezone" />
            {timezone && (
              <p className="text-sm">
                You selected: <span className="font-medium">{timezone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select with Descriptions</h2>
          <div className="space-y-4">
            <Select
              options={colorOptions}
              value={color}
              onChange={setColor}
              className="w-full max-w-xs"
              label="Select a color"
              placeholder="Choose a color"
              showDescription
            />
            {color && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                <p className="text-sm">
                  You selected: <span className="font-medium">{color}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
