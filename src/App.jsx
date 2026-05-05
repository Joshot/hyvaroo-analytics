import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Overview from './pages/Overview.jsx'
import UserAnalytics from './pages/UserAnalytics.jsx'
import EventTracking from './pages/EventTracking.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import useAnalytics from './hooks/useAnalytics.js'

export default function App() {
  const [dark, setDark] = useState(true)
  const [page, setPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const data = useAnalytics()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const pages = {
    overview: <Overview dark={dark} data={data} />,
    users:    <UserAnalytics dark={dark} data={data} />,
    events:   <EventTracking dark={dark} data={data} />,
    settings: <SettingsPage dark={dark} setDark={setDark} data={data} />,
  }

  return (
    <div className={`flex h-screen overflow-hidden ${dark ? 'bg-[#0A0F1C] text-gray-100' : 'bg-[#F8FAFC] text-gray-900'}`}>
      <Sidebar dark={dark} page={page} setPage={(p) => { setPage(p); setSidebarOpen(false) }} open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile topbar */}
        <div className={`lg:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-10 ${dark ? 'bg-[#0A0F1C] border-white/5' : 'bg-white border-gray-100'}`}>
          <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-xl ${dark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{background:'linear-gradient(135deg,#4f46e5,#8b5cf6)'}}>H</div>
            <span className="font-bold text-sm">Analytics</span>
          </div>
          <div className="w-9" />
        </div>
        {pages[page] || pages.overview}
      </main>
    </div>
  )
}
