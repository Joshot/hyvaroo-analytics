// Deterministic dummy data generator
const SEED_KEY = 'ha_seeded_v2'

function rng(seed) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
}

export function seedData() {
  if (localStorage.getItem(SEED_KEY)) return
  const rand = rng(42)

  // Daily analytics — 30 days
  const analytics = Array.from({ length: 30 }, (_, i) => {
    const date = new Date('2026-04-06')
    date.setDate(date.getDate() + i)
    const visits = Math.floor(800 + rand() * 1200)
    const sessions = Math.floor(visits * (0.65 + rand() * 0.25))
    const conversions = Math.floor(sessions * (0.03 + rand() * 0.07))
    const revenue = Math.floor(conversions * (25 + rand() * 75))
    return {
      date: date.toISOString().slice(0, 10),
      visits,
      sessions,
      conversions,
      revenue,
    }
  })
  localStorage.setItem('ha_analytics', JSON.stringify(analytics))

  // Users — 40
  const statuses = ['Active', 'Active', 'Active', 'Inactive']
  const activities = ['Viewed Dashboard', 'Exported Report', 'Updated Settings', 'Viewed Users', 'Created Event', 'Logged In', 'Ran Query', 'Viewed Charts']
  const users = Array.from({ length: 40 }, (_, i) => ({
    id: `USR-${String(i + 1).padStart(4, '0')}`,
    name: ['Alex Morgan', 'Jordan Lee', 'Sam Chen', 'Taylor Kim', 'Riley Park', 'Casey Wang', 'Morgan Liu', 'Jamie Zhang'][i % 8],
    email: `user${i + 1}@company.com`,
    activity: activities[Math.floor(rand() * activities.length)],
    sessionTime: Math.floor(60 + rand() * 840),
    pages: Math.floor(2 + rand() * 18),
    status: statuses[Math.floor(rand() * statuses.length)],
    joinedDaysAgo: Math.floor(1 + rand() * 90),
  }))
  localStorage.setItem('ha_users', JSON.stringify(users))

  // Traffic sources
  const sources = [
    { name: 'Organic Search', value: 38, color: '#4f46e5' },
    { name: 'Direct', value: 24, color: '#8b5cf6' },
    { name: 'Social Media', value: 18, color: '#22d3ee' },
    { name: 'Referral', value: 12, color: '#f59e0b' },
    { name: 'Email', value: 8, color: '#10b981' },
  ]
  localStorage.setItem('ha_sources', JSON.stringify(sources))

  // Events feed
  const eventTypes = ['page_view', 'click', 'signup', 'purchase', 'logout', 'search', 'download', 'share']
  const eventLabels = { page_view:'Viewed page', click:'Clicked element', signup:'New signup', purchase:'Purchase completed', logout:'User logged out', search:'Searched query', download:'Downloaded file', share:'Shared content' }
  const evColors = { page_view:'#4f46e5', click:'#22d3ee', signup:'#10b981', purchase:'#f59e0b', logout:'#6b7280', search:'#8b5cf6', download:'#3b82f6', share:'#ec4899' }
  const now = Date.now()
  const events = Array.from({ length: 50 }, (_, i) => {
    const type = eventTypes[Math.floor(rand() * eventTypes.length)]
    return {
      id: `EVT-${i + 1}`,
      type,
      label: eventLabels[type],
      color: evColors[type],
      userId: `USR-${String(Math.floor(rand() * 40) + 1).padStart(4, '0')}`,
      timestamp: new Date(now - Math.floor(rand() * 86400000 * 3)).toISOString(),
    }
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  localStorage.setItem('ha_events', JSON.stringify(events))

  localStorage.setItem(SEED_KEY, '1')
}

export function getAnalytics() { try { return JSON.parse(localStorage.getItem('ha_analytics')) || [] } catch { return [] } }
export function getUsers()     { try { return JSON.parse(localStorage.getItem('ha_users')) || [] } catch { return [] } }
export function getSources()   { try { return JSON.parse(localStorage.getItem('ha_sources')) || [] } catch { return [] } }
export function getEvents()    { try { return JSON.parse(localStorage.getItem('ha_events')) || [] } catch { return [] } }

export function addEvent(type) {
  const eventLabels = { page_view:'Viewed page', click:'Clicked element', signup:'New signup', purchase:'Purchase completed', search:'Searched query', download:'Downloaded file' }
  const evColors = { page_view:'#4f46e5', click:'#22d3ee', signup:'#10b981', purchase:'#f59e0b', search:'#8b5cf6', download:'#3b82f6' }
  const events = getEvents()
  const rand = rng(Date.now() & 0xffffffff)
  const newEvent = {
    id: `EVT-${Date.now()}`,
    type,
    label: eventLabels[type] || type,
    color: evColors[type] || '#6b7280',
    userId: `USR-${String(Math.floor(rand() * 40) + 1).padStart(4, '0')}`,
    timestamp: new Date().toISOString(),
  }
  events.unshift(newEvent)
  localStorage.setItem('ha_events', JSON.stringify(events.slice(0, 100)))
  return events.slice(0, 100)
}

export function resetAll() {
  ['ha_analytics','ha_users','ha_sources','ha_events', SEED_KEY].forEach(k => localStorage.removeItem(k))
}
