"use client"

import { useState } from "react"
import { Select, type SelectProps } from "./select"

export type BasicSelectProps = Omit<SelectProps, "options"> & {
  /** Array of fruit options or custom options */
  options?: SelectProps["options"]
}

/**
 * A pre-configured select component with fruit options
 */
export function BasicSelect({ options, ...props }: BasicSelectProps) {
  const [value, setValue] = useState<string>(props.value || "")

  // Default fruit options
  const defaultOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]

  const handleChange = (newValue: string) => {
    setValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <Select
      options={options || defaultOptions}
      value={props.value !== undefined ? props.value : value}
      onChange={handleChange}
      placeholder={props.placeholder || "Select a fruit"}
      {...props}
    />
  )
}
