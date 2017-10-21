import React from 'react'
import { format, addMinutes } from 'date-fns'

export const format12Hour = (hours, minutes) => {
  const period = hours >= 12 ? 'PM' : 'AM'
  const minuteStr = minutes < 10 ? '0' + minutes : String(minutes)

  return `${((hours + 11) % 12 + 1)}:${minuteStr}${period}`
}

export const formatTimeslot = (timeInSeconds, duration) => {
  const dateObject = new Date(timeInSeconds * 1000)
  const dateString = format(dateObject, ['YYYY-MM-DD'])
  const hours = dateObject.getUTCHours()
  const minutes = dateObject.getUTCMinutes()
  const start = format12Hour(hours, minutes)
  const endTime = addMinutes(dateObject, duration)
  const endHours = endTime.getUTCHours()
  const endMinutes = endTime.getUTCMinutes()
  const end = format12Hour(endHours, endMinutes)

  return (
    <div>
      <p>{dateString}</p>
      <p>{`${start}-${end}`}</p>
    </div>
  )
}

export const dateToSeconds = (timeString) => {
  const date = new Date(timeString)
  const offset = date.getTimezoneOffset() * 60
  const timeInSeconds = date / 1000

  return timeInSeconds - offset
}
