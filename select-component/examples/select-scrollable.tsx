import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="utc-12">(UTC-12:00) International Date Line West</SelectItem>
        <SelectItem value="utc-11">(UTC-11:00) Coordinated Universal Time-11</SelectItem>
        <SelectItem value="utc-10">(UTC-10:00) Hawaii</SelectItem>
        <SelectItem value="utc-9">(UTC-09:00) Alaska</SelectItem>
        <SelectItem value="utc-8">(UTC-08:00) Pacific Time (US & Canada)</SelectItem>
        <SelectItem value="utc-7">(UTC-07:00) Mountain Time (US & Canada)</SelectItem>
        <SelectItem value="utc-6">(UTC-06:00) Central Time (US & Canada)</SelectItem>
        <SelectItem value="utc-5">(UTC-05:00) Eastern Time (US & Canada)</SelectItem>
        <SelectItem value="utc-4">(UTC-04:00) Atlantic Time (Canada)</SelectItem>
        <SelectItem value="utc-3">(UTC-03:00) Brasilia</SelectItem>
        <SelectItem value="utc-2">(UTC-02:00) Coordinated Universal Time-02</SelectItem>
        <SelectItem value="utc-1">(UTC-01:00) Azores</SelectItem>
        <SelectItem value="utc">(UTC) Coordinated Universal Time</SelectItem>
        <SelectItem value="utc+1">(UTC+01:00) Central European Time</SelectItem>
        <SelectItem value="utc+2">(UTC+02:00) Eastern European Time</SelectItem>
        <SelectItem value="utc+3">(UTC+03:00) Moscow Time</SelectItem>
        <SelectItem value="utc+4">(UTC+04:00) Dubai</SelectItem>
        <SelectItem value="utc+5">(UTC+05:00) Pakistan Standard Time</SelectItem>
        <SelectItem value="utc+5.5">(UTC+05:30) Indian Standard Time</SelectItem>
        <SelectItem value="utc+6">(UTC+06:00) Bangladesh Standard Time</SelectItem>
        <SelectItem value="utc+7">(UTC+07:00) Indochina Time</SelectItem>
        <SelectItem value="utc+8">(UTC+08:00) China Standard Time</SelectItem>
        <SelectItem value="utc+9">(UTC+09:00) Japan Standard Time</SelectItem>
        <SelectItem value="utc+10">(UTC+10:00) Australian Eastern Standard Time</SelectItem>
        <SelectItem value="utc+11">(UTC+11:00) Solomon Islands Time</SelectItem>
        <SelectItem value="utc+12">(UTC+12:00) New Zealand Standard Time</SelectItem>
      </SelectContent>
    </Select>
  )
}
