import { useState, useEffect, useCallback } from 'react'
import { seedData, getAnalytics, getUsers, getSources, getEvents, addEvent as addEv, resetAll as resetAllData } from '../data/seed.js'

export default function useAnalytics() {
  const [analytics, setAnalytics] = useState([])
  const [users, setUsers]         = useState([])
  const [sources, setSources]     = useState([])
  const [events, setEvents]       = useState([])
  const [range, setRange]         = useState(30)
  const [filter, setFilter]       = useState('all')

  useEffect(() => {
    seedData()
    setAnalytics(getAnalytics())
    setUsers(getUsers())
    setSources(getSources())
    setEvents(getEvents())
  }, [])

  const sliced = analytics.slice(-range)

  const totals = {
    users:       sliced.reduce((s, d) => s + d.visits, 0),
    sessions:    sliced.reduce((s, d) => s + d.sessions, 0),
    conversions: sliced.reduce((s, d) => s + d.conversions, 0),
    revenue:     sliced.reduce((s, d) => s + d.revenue, 0),
    convRate:    sliced.length ? (sliced.reduce((s,d) => s + d.conversions, 0) / sliced.reduce((s,d) => s + d.sessions, 0) * 100).toFixed(1) : 0,
  }

  const addEvent = useCallback((type) => {
    setEvents(addEv(type))
  }, [])

  const resetAll = useCallback(() => {
    resetAllData()
    seedData()
    setAnalytics(getAnalytics())
    setUsers(getUsers())
    setSources(getSources())
    setEvents(getEvents())
  }, [])

  return { analytics: sliced, users, sources, events, totals, range, setRange, filter, setFilter, addEvent, resetAll }
}
