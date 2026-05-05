import { useState } from 'react'
import { Zap, MousePointer, Eye, UserPlus, ShoppingCart, Search, Download } from 'lucide-react'
import clsx from 'clsx'

const EVENT_TYPES = [
  { type:'page_view', label:'Page View',  Icon: Eye,          color:'#4f46e5' },
  { type:'click',     label:'Click',      Icon: MousePointer, color:'#22d3ee' },
  { type:'signup',    label:'Signup',     Icon: UserPlus,     color:'#10b981' },
  { type:'purchase',  label:'Purchase',   Icon: ShoppingCart, color:'#f59e0b' },
  { type:'search',    label:'Search',     Icon: Search,       color:'#8b5cf6' },
  { type:'download',  label:'Download',   Icon: Download,     color:'#3b82f6' },
]

function timeAgo(ts) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

export default function EventTracking({ dark, data }) {
  const { events, addEvent } = data
  const [firing, setFiring] = useState(null)

  const fire = (type) => {
    setFiring(type)
    addEvent(type)
    setTimeout(() => setFiring(null), 600)
  }

  // Count per type
  const counts = EVENT_TYPES.reduce((acc, et) => {
    acc[et.type] = events.filter(e => e.type === et.type).length
    return acc
  }, {})

  return (
    <div className={clsx('min-h-screen p-6 lg:p-8', dark ? 'bg-[#0A0F1C]' : 'bg-[#F8FAFC]')}>
      <div className="mb-8">
        <h1 className={clsx('text-2xl font-black mb-1', dark ? 'text-white' : 'text-gray-900')}>Event Tracking</h1>
        <p className={clsx('text-sm', dark ? 'text-gray-500' : 'text-gray-400')}>Simulate and monitor real-time user actions.</p>
      </div>

      {/* Simulate buttons */}
      <div className={clsx('p-5 rounded-2xl border mb-6', dark?'bg-[#0D1424] border-white/5':'bg-white border-gray-100 shadow-sm')}>
        <p className={clsx('text-xs font-bold uppercase tracking-widest mb-4', dark?'text-gray-500':'text-gray-400')}>Simulate Events</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {EVENT_TYPES.map(({ type, label, Icon, color }) => (
            <button key={type} onClick={() => fire(type)}
              className={clsx(
                'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center',
                firing === type ? 'scale-95' : 'hover:-translate-y-0.5',
                dark ? 'bg-white/3 border-white/5 hover:border-white/15' : 'bg-gray-50 border-gray-100 hover:border-gray-200 hover:bg-white'
              )}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${color}20`}}>
                <Icon size={16} style={{color}} />
              </div>
              <span className={clsx('text-[11px] font-semibold', dark?'text-gray-400':'text-gray-600')}>{label}</span>
              <span className={clsx('text-lg font-black', dark?'text-white':'text-gray-900')}>{counts[type] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className={clsx('rounded-2xl border overflow-hidden', dark?'bg-[#0D1424] border-white/5':'bg-white border-gray-100 shadow-sm')}>
        <div className={clsx('flex items-center justify-between px-5 py-4 border-b', dark?'border-white/5':'border-gray-100')}>
          <div className="flex items-center gap-2">
            <Zap size={15} className="text-indigo-400" />
            <p className={clsx('font-bold text-sm', dark?'text-white':'text-gray-900')}>Recent Activity Feed</p>
          </div>
          <span className={clsx('text-xs px-2.5 py-1 rounded-full font-semibold', dark?'bg-indigo-500/15 text-indigo-400':'bg-indigo-50 text-indigo-600')}>{events.length} events</span>
        </div>
        <div className="divide-y max-h-[520px] overflow-y-auto" style={{borderColor: dark?'rgba(255,255,255,0.04)':'#f1f5f9'}}>
          {events.slice(0, 50).map((ev, i) => {
            const meta = EVENT_TYPES.find(e => e.type === ev.type)
            const Icon = meta?.Icon || Zap
            return (
              <div key={ev.id} className={clsx('flex items-center gap-4 px-5 py-3.5 transition-colors animate-fade-in', dark?'hover:bg-white/2':'hover:bg-gray-50')} style={{animationDelay:`${i*20}ms`}}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${ev.color}18`}}>
                  <Icon size={14} style={{color:ev.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={clsx('text-xs font-semibold', dark?'text-gray-200':'text-gray-800')}>{ev.label}</p>
                  <p className={clsx('text-[11px]', dark?'text-gray-600':'text-gray-400')}>by {ev.userId}</p>
                </div>
                <span className={clsx('text-[11px] flex-shrink-0', dark?'text-gray-600':'text-gray-400')}>{timeAgo(ev.timestamp)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
