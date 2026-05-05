import { TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'
import { useCountUp } from '../hooks/useCountUp.js'

export default function StatCard({ dark, label, value, prefix='', suffix='', change, changeLabel, Icon, gradient, delay=0 }) {
  const displayed = useCountUp(typeof value === 'number' ? value : 0, 1200, delay)

  const formatted = prefix + (typeof value === 'number'
    ? value >= 1000000 ? (displayed / 1000000).toFixed(1) + 'M'
    : value >= 1000 ? (displayed / 1000).toFixed(1) + 'K'
    : displayed.toString()
    : value) + suffix

  const isPos = parseFloat(change) >= 0

  return (
    <div className={clsx(
      'relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 group animate-fade-up',
      dark ? 'bg-[#0D1424] border-white/5 hover:border-indigo-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
    )} style={{ animationDelay: `${delay}ms` }}>
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: gradient || 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

      <div className="flex items-start justify-between mb-4">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', dark ? 'bg-white/5' : 'bg-gray-50')}>
          <Icon size={18} style={{ color: gradient ? '#22d3ee' : '#4f46e5' }} />
        </div>
        {change !== undefined && (
          <div className={clsx('flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
            isPos ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
          )}>
            {isPos ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
            {isPos ? '+' : ''}{change}%
          </div>
        )}
      </div>

      <p className={clsx('text-2xl font-black mb-1', dark ? 'text-white' : 'text-gray-900')}>{formatted}</p>
      <p className={clsx('text-xs font-medium', dark ? 'text-gray-500' : 'text-gray-400')}>{label}</p>
      {changeLabel && <p className={clsx('text-[11px] mt-1', dark ? 'text-gray-600' : 'text-gray-300')}>{changeLabel}</p>}
    </div>
  )
}
