import { LayoutDashboard, Users, Zap, Settings, TrendingUp, X } from 'lucide-react'
import clsx from 'clsx'

const links = [
  { id:'overview', label:'Overview',       Icon: LayoutDashboard },
  { id:'users',    label:'User Analytics', Icon: Users },
  { id:'events',   label:'Event Tracking', Icon: Zap },
  { id:'settings', label:'Settings',       Icon: Settings },
]

export default function Sidebar({ dark, page, setPage, open, setOpen }) {
  return (
    <aside className={clsx(
      'fixed lg:relative inset-y-0 left-0 z-30 w-60 flex flex-col border-r transition-transform duration-300',
      dark ? 'bg-[#0A0F1C] border-white/5' : 'bg-white border-gray-100',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b" style={{borderColor: dark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm relative" style={{background:'linear-gradient(135deg,#4f46e5,#8b5cf6)'}}>
            H
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full border-2" style={{borderColor: dark ? '#0A0F1C' : 'white'}} />
          </div>
          <div>
            <p className="font-black text-sm leading-none">Hyvaroo</p>
            <p className="text-[10px] font-semibold leading-none mt-0.5" style={{background:'linear-gradient(135deg,#4f46e5,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Analytics</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-white/5">
          <X size={16} className={dark ? 'text-gray-500' : 'text-gray-400'} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className={clsx('px-3 text-[10px] font-bold uppercase tracking-widest mb-3', dark ? 'text-gray-600' : 'text-gray-400')}>Navigation</p>
        {links.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              page === id
                ? 'text-white' : dark
                ? 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            )}
            style={page === id ? {background:'linear-gradient(135deg,rgba(79,70,229,0.2),rgba(139,92,246,0.15))', border:'1px solid rgba(79,70,229,0.3)'} : {}}
          >
            <Icon size={16} className={page === id ? 'text-indigo-400' : ''} />
            {label}
            {page === id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
          </button>
        ))}
      </nav>

      {/* Bottom status */}
      <div className={clsx('mx-3 mb-4 p-3 rounded-xl', dark ? 'bg-white/3 border border-white/5' : 'bg-gray-50 border border-gray-100')}>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className={clsx('text-xs font-semibold', dark ? 'text-gray-400' : 'text-gray-600')}>System Status</span>
        </div>
        <p className={clsx('text-xs', dark ? 'text-gray-600' : 'text-gray-400')}>All systems operational</p>
      </div>
    </aside>
  )
}
