"use client"

import type React from "react"

import { useState, useRef, useEffect, type KeyboardEvent, forwardRef } from "react"
import { cn } from "../lib/utils"

// SVG icons as React components
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 opacity-50"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

// Types
export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export type SelectProps = {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      itemClassName,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const selectedLabel = options.find((option) => option.value === selectedValue)?.label

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    // Scroll highlighted item into view
    useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
        const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement
        if (highlightedElement) {
          const containerRect = dropdownRef.current.getBoundingClientRect()
          const elementRect = highlightedElement.getBoundingClientRect()

          if (elementRect.bottom > containerRect.bottom) {
            dropdownRef.current.scrollTop += elementRect.bottom - containerRect.bottom
          } else if (elementRect.top < containerRect.top) {
            dropdownRef.current.scrollTop -= containerRect.top - elementRect.top
          }
        }
      }
    }, [highlightedIndex, isOpen])

    // Update internal state when value prop changes
    useEffect(() => {
      setSelectedValue(value)
    }, [value])

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return

      setSelectedValue(option.value)
      onChange?.(option.value)
      setIsOpen(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault()
          if (isOpen && highlightedIndex >= 0) {
            const option = options[highlightedIndex]
            if (!option.disabled) {
              handleSelect(option)
            }
          } else {
            setIsOpen((prev) => !prev)
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            let nextIndex = highlightedIndex + 1
            while (nextIndex < options.length && options[nextIndex].disabled) {
              nextIndex++
            }
            if (nextIndex < options.length) {
              setHighlightedIndex(nextIndex)
            }
          }
          break
        case "ArrowUp":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            let prevIndex = highlightedIndex - 1
            while (prevIndex >= 0 && options[prevIndex].disabled) {
              prevIndex--
            }
            if (prevIndex >= 0) {
              setHighlightedIndex(prevIndex)
            }
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
        case "Tab":
          if (isOpen) {
            e.preventDefault()
            setIsOpen(false)
          }
          break
      }
    }

    return (
      <div ref={containerRef} className={cn("relative", className)} onKeyDown={handleKeyDown}>
        <div
          ref={ref}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="select-dropdown"
          aria-label={placeholder}
          tabIndex={disabled ? -1 : 0}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            disabled && "opacity-50 cursor-not-allowed",
            triggerClassName,
          )}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          <span className="line-clamp-1">
            {selectedLabel || <span className="text-muted-foreground">{placeholder}</span>}
          </span>
          <ChevronDownIcon />
        </div>

        {isOpen && (
          <div
            id="select-dropdown"
            role="listbox"
            ref={dropdownRef}
            aria-activedescendant={
              highlightedIndex >= 0 ? `select-option-${options[highlightedIndex].value}` : undefined
            }
            className={cn(
              "absolute z-50 mt-1 max-h-60 min-w-[8rem] overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
              "w-full",
              contentClassName,
            )}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`select-option-${option.value}`}
                role="option"
                aria-selected={selectedValue === option.value}
                aria-disabled={option.disabled}
                className={cn(
                  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                  selectedValue === option.value && "bg-accent text-accent-foreground",
                  highlightedIndex === index && "bg-accent text-accent-foreground",
                  option.disabled
                    ? "text-muted-foreground opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                  itemClassName,
                )}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {selectedValue === option.value && <CheckIcon />}
                </span>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)

Select.displayName = "Select"

// Export individual components to match the shadcn/ui API
export const SelectTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { placeholder?: string }
>(({ children, ...props }, ref) => {
  // This is just a wrapper for API compatibility
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = ({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) => {
  // This is just a wrapper for API compatibility
  return children || <span className="text-muted-foreground">{placeholder}</span>
}

export const SelectContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    // This is just a wrapper for API compatibility
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
SelectContent.displayName = "SelectContent"

export const SelectItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean }
>(({ children, ...props }, ref) => {
  // This is just a wrapper for API compatibility
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export const SelectGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    // This is just a wrapper for API compatibility
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
SelectGroup.displayName = "SelectGroup"

export const SelectLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    // This is just a wrapper for API compatibility
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
SelectLabel.displayName = "SelectLabel"

export const SelectSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
  // This is just a wrapper for API compatibility
  return <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", props.className)} {...props} />
})
SelectSeparator.displayName = "SelectSeparator"
