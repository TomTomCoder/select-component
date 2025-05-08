# Select Component

A customizable, accessible select component for React applications.

## Features

- 🚀 Easy to import and use in any project
- 🎨 Fully customizable with Tailwind CSS
- ♿ Accessible with keyboard navigation and ARIA attributes
- 📱 Responsive and mobile-friendly
- 🌙 Dark mode support
- 🔍 Support for descriptions and custom rendering
- 🧩 Form integration with validation

## Installation

1. Copy the `components/ui/select` folder to your project
2. Make sure you have the required dependencies:
   - React
   - Tailwind CSS
   - clsx (optional, for class name merging)
   - tailwind-merge (optional, for better Tailwind class merging)

## Basic Usage

\`\`\`tsx
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select'
import { useState } from 'react'

export default function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <Select
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  )
}
\`\`\`

## Pre-configured Components

The package includes pre-configured components for common use cases:

\`\`\`tsx
import { BasicSelect, ScrollableSelect } from '@/components/ui/select'

export default function MyComponent() {
  return (
    <div>
      <BasicSelect onChange={(value) => console.log(value)} />
      <ScrollableSelect onChange={(value) => console.log(value)} />
    </div>
  )
}
\`\`\`

## Advanced Usage

### With Labels and Validation

\`\`\`tsx
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select'

export default function MyForm() {
  const [value, setValue] = useState('')
  
  return (
    <Select
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ]}
      value={value}
      onChange={setValue}
      label="Select an option"
      required
      error={!value ? "This field is required" : undefined}
    />
  )
}
\`\`\`

### With Descriptions

\`\`\`tsx
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select'

export default function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <Select
      options={[
        { 
          label: "Option 1", 
          value: "option1",
          description: "This is the first option"
        },
        { 
          label: "Option 2", 
          value: "option2",
          description: "This is the second option"
        },
      ]}
      value={value}
      onChange={setValue}
      showDescription
    />
  )
}
\`\`\`

### Custom Rendering

\`\`\`tsx
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select'

export default function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <Select
      options={[
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
      ]}
      value={value}
      onChange={setValue}
      renderOption={(option) => (
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: option.value }}
          />
          {option.label}
        </div>
      )}
    />
  )
}
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `SelectOption[]` | Array of options for the select |
| `value` | `string` | Currently selected value |
| `onChange` | `(value: string) => void` | Callback when selection changes |
| `placeholder` | `string` | Default text shown when no option is selected |
| `disabled` | `boolean` | Whether the select is disabled |
| `className` | `string` | Custom class for the container |
| `triggerClassName` | `string` | Custom class for the trigger button |
| `contentClassName` | `string` | Custom class for the dropdown content |
| `itemClassName` | `string` | Custom class for each item |
| `maxHeight` | `number` | Maximum height of the dropdown in pixels |
| `showDescription` | `boolean` | Whether to show a description below the label |
| `renderOption` | `(option: SelectOption) => ReactNode` | Custom render function for each option |
| `id` | `string` | ID for the select component |
| `name` | `string` | Name for the select component (for forms) |
| `error` | `string` | Error message |
| `label` | `string` | Label for the select |
| `required` | `boolean` | Whether the select is required |

## Customization

You can customize the appearance of the select component by:

1. Passing className props to different parts of the component
2. Modifying the CSS variables in `globals.css` to change the theme colors
3. Editing the component files directly for deeper customization
