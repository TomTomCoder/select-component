"use client"

import { useState } from "react"
import { Select } from "./select"

export function BasicSelect() {
  const [value, setValue] = useState<string>("")

  return (
    <Select
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Blueberry", value: "blueberry" },
        { label: "Grapes", value: "grapes" },
        { label: "Pineapple", value: "pineapple" },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
      className="w-[180px]"
    />
  )
}
