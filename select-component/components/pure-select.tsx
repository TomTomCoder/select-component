"use client"

import type React from "react"

import { useState, useRef, useEffect, type KeyboardEvent, forwardRef } from "react"
import "../styles/select.css"

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
    className="select-icon"
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
    className="select-icon"
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
  style?: React.CSSProperties
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select an option", disabled = false, className = "", style }, ref) => {
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
      <div ref={containerRef} className={`select-container ${className}`} style={style} onKeyDown={handleKeyDown}>
        <div
          ref={ref}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="select-dropdown"
          aria-label={placeholder}
          tabIndex={disabled ? -1 : 0}
          className={`select-trigger ${disabled ? "disabled" : ""}`}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          <span>{selectedLabel || <span className="select-placeholder">{placeholder}</span>}</span>
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
            className="select-dropdown"
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`select-option-${option.value}`}
                role="option"
                aria-selected={selectedValue === option.value}
                aria-disabled={option.disabled}
                className={`select-item ${selectedValue === option.value ? "selected" : ""} ${
                  highlightedIndex === index ? "highlighted" : ""
                } ${option.disabled ? "disabled" : ""}`}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
              >
                <span className="select-item-check">{selectedValue === option.value && <CheckIcon />}</span>
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
