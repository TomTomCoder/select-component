"use client"
import { Select } from "./pure-select"

export function ScrollableSelectPure() {
  return (
    <Select
      options={[
        { label: "(UTC-12:00) International Date Line West", value: "utc-12" },
        { label: "(UTC-11:00) Coordinated Universal Time-11", value: "utc-11" },
        { label: "(UTC-10:00) Hawaii", value: "utc-10" },
        { label: "(UTC-09:00) Alaska", value: "utc-9" },
        { label: "(UTC-08:00) Pacific Time (US & Canada)", value: "utc-8" },
        { label: "(UTC-07:00) Mountain Time (US & Canada)", value: "utc-7" },
        { label: "(UTC-06:00) Central Time (US & Canada)", value: "utc-6" },
        { label: "(UTC-05:00) Eastern Time (US & Canada)", value: "utc-5" },
        { label: "(UTC-04:00) Atlantic Time (Canada)", value: "utc-4" },
        { label: "(UTC-03:00) Brasilia", value: "utc-3" },
        { label: "(UTC-02:00) Coordinated Universal Time-02", value: "utc-2" },
        { label: "(UTC-01:00) Azores", value: "utc-1" },
        { label: "(UTC) Coordinated Universal Time", value: "utc" },
        { label: "(UTC+01:00) Central European Time", value: "utc+1" },
        { label: "(UTC+02:00) Eastern European Time", value: "utc+2" },
        { label: "(UTC+03:00) Moscow Time", value: "utc+3" },
        { label: "(UTC+04:00) Dubai", value: "utc+4" },
        { label: "(UTC+05:00) Pakistan Standard Time", value: "utc+5" },
        { label: "(UTC+05:30) Indian Standard Time", value: "utc+5.5" },
        { label: "(UTC+06:00) Bangladesh Standard Time", value: "utc+6" },
        { label: "(UTC+07:00) Indochina Time", value: "utc+7" },
        { label: "(UTC+08:00) China Standard Time", value: "utc+8" },
        { label: "(UTC+09:00) Japan Standard Time", value: "utc+9" },
        { label: "(UTC+10:00) Australian Eastern Standard Time", value: "utc+10" },
        { label: "(UTC+11:00) Solomon Islands Time", value: "utc+11" },
        { label: "(UTC+12:00) New Zealand Standard Time", value: "utc+12" },
      ]}
      placeholder="Select a timezone"
      style={{ width: "280px" }}
    />
  )
}
