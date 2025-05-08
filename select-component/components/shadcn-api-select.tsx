"use client"
import { Select } from "./select"

export function ShadcnApiSelect() {
  // This component doesn't actually work with our implementation
  // It's just to show the API compatibility pattern
  return (
    <div className="w-[180px]">
      <p className="text-sm text-red-500 mb-2">
        Note: This is just for API demonstration - use the BasicSelect component instead
      </p>
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Blueberry", value: "blueberry" },
          { label: "Grapes", value: "grapes" },
          { label: "Pineapple", value: "pineapple" },
        ]}
        placeholder="Select a fruit"
      />
    </div>
  )
}
