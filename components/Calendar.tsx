"use client"
import * as React from "react"

import { v6 } from "uuid"

interface EVENT {
  id: string
  title: string
  start: number
  end: number
}

interface CURRENT_EVENT {
  title: string
  start: number | null
  end: number | null
}

const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
]

const initialEvent = {
  title: "",
  start: null,
  end: null,
}

const demoData = [
  { id: "a", title: "Meeting 1", start: 2, end: 3 },
  { id: "b", title: "Meeting 2", start: 4, end: 6 },
  { id: "c", title: "Meeting 3", start: 12, end: 13 },
]

const Calendar: React.FC = () => {
  const [events, setEvents] = React.useState<EVENT[]>(demoData)
  const [editingEventId, setEditingEventId] = React.useState("")
  const [currentEvent, setCurrentEvent] =
    React.useState<CURRENT_EVENT>(initialEvent)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEvent({
      ...currentEvent,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      setEvents((events) => {
        return events.map((event) => {
          if (event.id === editingEventId) {
            return {
              id: editingEventId,
              ...currentEvent,
            } as EVENT
          } else {
            return event
          }
        })
      })
      setCurrentEvent(initialEvent)
      setEditingEventId("")
      setIsEditing(false)
    } else {
      const newEvent = {
        id: v6(),
        ...currentEvent,
      }
      setEvents([...events, newEvent as EVENT])
      setCurrentEvent(initialEvent)
    }
  }

  const deleteEvent = () => {
    setEvents((events) => events.filter((event) => event.id !== editingEventId))
    setCurrentEvent(initialEvent)
    setEditingEventId("")
  }

  const renderHour = (hour: number) => {
    let overlappingEvent: EVENT | null = null
    events.forEach((event) => {
      if (hour >= event.start && hour <= event.end) {
        overlappingEvent = event
      }
    })

    if (overlappingEvent !== null) {
      return (
        <div
          key={hour}
          className="grid grid-cols-12 border-b border-b-zinc-300"
        >
          <div className="bg-zinc-200 text-center px-2 py-1">{hour}</div>
          <div
            className="bg-zinc-700 col-span-11 hover:bg-zinc-800 text-white px-2 py-1"
            onClick={() => {
              setIsEditing(true)
              setEditingEventId((overlappingEvent as EVENT).id)
              setCurrentEvent(overlappingEvent as CURRENT_EVENT)
            }}
          >
            {(overlappingEvent as EVENT).title}
          </div>
        </div>
      )
    } else {
      return (
        <div
          key={hour}
          className="grid grid-cols-12 border-b border-b-zinc-300"
        >
          <div className="bg-zinc-200 text-center px-2 py-1">{hour}</div>
          <div className="bg-zinc-100 col-span-11 px-2 py-1"></div>
        </div>
      )
    }
  }

  return (
    <main className="h-dvh tracking-tighter">
      <header className="py-2 text-sm bg-zinc-900">
        <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
          <input
            type="text"
            className="border border-zinc-700 text-zinc-300 px-2 py-1.5"
            placeholder="Event Title"
            value={currentEvent.title}
            name="title"
            onChange={handleInput}
            required
          />
          <input
            type="number"
            className="border border-zinc-700 text-zinc-300 px-2 py-1.5"
            placeholder="Event Start Time"
            name="start"
            value={currentEvent.start ?? ""}
            onChange={handleInput}
            required
          />
          <input
            type="number"
            className="border border-zinc-700 text-zinc-300 px-2 py-1.5"
            placeholder="Event End Time"
            name="end"
            value={currentEvent.end ?? ""}
            onChange={handleInput}
            required
          />
          <button
            type="submit"
            className="bg-zinc-300 text-zinc-700 px-3.5 py-1.5"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="bg-zinc-300 text-zinc-700 px-3.5 py-1.5"
              onClick={() => deleteEvent()}
            >
              Delete
            </button>
          )}
        </form>
      </header>

      <section>{HOURS.map((hour) => renderHour(hour))}</section>
    </main>
  )
}

export default Calendar
