"use client"

import type React from "react"
import { useState, useRef, useEffect, forwardRef, type ReactNode } from "react"
import { cn } from "./utils"
import { ChevronDownIcon, CheckIcon } from "./icons"

// Types
export type SelectOption = {
  label: string | ReactNode
  value: string
  disabled?: boolean
  description?: string
}

export type SelectProps = {
  /** Array of options for the select */
  options: SelectOption[]
  /** Currently selected value */
  value?: string
  /** Callback when selection changes */
  onChange?: (value: string) => void
  /** Default text shown when no option is selected */
  placeholder?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Custom class for the container */
  className?: string
  /** Custom class for the trigger button */
  triggerClassName?: string
  /** Custom class for the dropdown content */
  contentClassName?: string
  /** Custom class for each item */
  itemClassName?: string
  /** Maximum height of the dropdown in pixels */
  maxHeight?: number
  /** Whether to show a description below the label */
  showDescription?: boolean
  /** Custom render function for each option */
  renderOption?: (option: SelectOption) => ReactNode
  /** ID for the select component */
  id?: string
  /** Name for the select component (for forms) */
  name?: string
  /** Error message */
  error?: string
  /** Label for the select */
  label?: string
  /** Whether the select is required */
  required?: boolean
}

/**
 * A customizable select component
 */
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
      maxHeight = 250,
      showDescription = false,
      renderOption,
      id,
      name,
      error,
      label,
      required,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const selectedOption = options.find((option) => option.value === selectedValue)

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium mb-1.5",
              error ? "text-red-500" : "text-gray-700 dark:text-gray-300",
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
          <div
            ref={ref}
            id={id}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="select-dropdown"
            aria-label={placeholder}
            aria-invalid={!!error}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              error ? "border-red-500 focus:ring-red-500" : "border-input focus:border-input",
              disabled && "opacity-50 cursor-not-allowed",
              triggerClassName,
            )}
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            data-state={isOpen ? "open" : "closed"}
          >
            <span className="line-clamp-1">
              {selectedOption ? (
                renderOption ? (
                  renderOption(selectedOption)
                ) : (
                  selectedOption.label
                )
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <input type="hidden" name={name} value={selectedValue || ""} />
            <ChevronDownIcon className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
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
                "absolute z-50 mt-1 max-h-[var(--select-max-height)] min-w-[8rem] overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
                "w-full",
                contentClassName,
              )}
              style={{ "--select-max-height": `${maxHeight}px` } as React.CSSProperties}
            >
              {options.length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-500">No options available</div>
              ) : (
                options.map((option, index) => (
                  <div
                    key={option.value}
                    id={`select-option-${option.value}`}
                    role="option"
                    aria-selected={selectedValue === option.value}
                    aria-disabled={option.disabled}
                    className={cn(
                      "relative flex select-none flex-col rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
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
                    <div className="flex items-center">
                      {selectedValue === option.value && (
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                      )}
                      <span className={cn("pl-6", renderOption ? "" : "truncate")}>
                        {renderOption ? renderOption(option) : option.label}
                      </span>
                    </div>
                    {showDescription && option.description && (
                      <span className="pl-6 text-xs text-muted-foreground">{option.description}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

Select.displayName = "Select"
