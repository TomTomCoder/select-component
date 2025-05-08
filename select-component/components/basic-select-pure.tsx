"use client"
import { Select } from "./pure-select"

export function BasicSelectPure() {
  return (
    <Select
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Blueberry", value: "blueberry" },
        { label: "Grapes", value: "grapes" },
        { label: "Pineapple", value: "pineapple" },
      ]}
      placeholder="Select a fruit"
      style={{ width: "180px" }}
    />
  )
}
