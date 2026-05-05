import { Users, Activity, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import clsx from 'clsx'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend
} from 'recharts'
import StatCard from '../components/StatCard.jsx'

const RANGE_OPTIONS = [{ label: '7D', value: 7 }, { label: '30D', value: 30 }]
const FILTER_OPTIONS = ['all', 'traffic', 'sales', 'users']

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null
  return (
    <div className={clsx('px-4 py-3 rounded-xl border text-xs shadow-xl', dark ? 'bg-[#0D1424] border-white/10 text-gray-200' : 'bg-white border-gray-100 text-gray-800')}>
      <p className={clsx('font-bold mb-1', dark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  )
}

export default function Overview({ dark, data }) {
  const { analytics, sources, totals, range, setRange, filter, setFilter } = data

  const filteredAnalytics = analytics.map(d => {
    if (filter === 'traffic') return { date: d.date, Visits: d.visits }
    if (filter === 'sales')   return { date: d.date, Revenue: d.revenue, Conversions: d.conversions }
    if (filter === 'users')   return { date: d.date, Sessions: d.sessions }
    return { date: d.date, Visits: d.visits, Sessions: d.sessions }
  })

  const shortDate = (str) => { const d = new Date(str); return `${d.getMonth()+1}/${d.getDate()}` }
  const chartData = filteredAnalytics.map(d => ({ ...d, date: shortDate(d.date) }))
  const barData   = analytics.map(d => ({ date: shortDate(d.date), Sessions: d.sessions }))

  const stats = [
    { label:'Total Users',      value: totals.users,       prefix:'', suffix:'',  change: 12.4, changeLabel:`Last ${range} days`, Icon: Users,       gradient:'radial-gradient(circle,rgba(79,70,229,0.2) 0%,transparent 70%)' },
    { label:'Active Sessions',  value: totals.sessions,    prefix:'', suffix:'',  change: 8.1,  changeLabel:`Last ${range} days`, Icon: Activity,    gradient:'radial-gradient(circle,rgba(139,92,246,0.2) 0%,transparent 70%)' },
    { label:'Conversion Rate',  value: null,               prefix:'', suffix:'',  change: 2.3,  changeLabel:'vs previous period',  Icon: TrendingUp,  gradient:'radial-gradient(circle,rgba(34,211,238,0.2) 0%,transparent 70%)' },
    { label:'Total Revenue',    value: totals.revenue,     prefix:'$', suffix:'', change: 18.7, changeLabel:`Last ${range} days`, Icon: DollarSign,  gradient:'radial-gradient(circle,rgba(16,185,129,0.2) 0%,transparent 70%)' },
  ]

  return (
    <div className={clsx('min-h-screen p-6 lg:p-8', dark ? 'bg-[#0A0F1C]' : 'bg-[#F8FAFC]')}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className={clsx('text-2xl font-black mb-1', dark ? 'text-white' : 'text-gray-900')}>Overview</h1>
          <p className={clsx('text-sm', dark ? 'text-gray-500' : 'text-gray-400')}>Welcome back — here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Range */}
          <div className={clsx('flex rounded-xl border p-1 gap-1', dark ? 'bg-[#0D1424] border-white/5' : 'bg-white border-gray-200')}>
            {RANGE_OPTIONS.map(o => (
              <button key={o.value} onClick={() => setRange(o.value)}
                className={clsx('px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                  range === o.value ? 'text-white' : dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                )}
                style={range === o.value ? { background:'linear-gradient(135deg,#4f46e5,#8b5cf6)' } : {}}
              >{o.label}</button>
            ))}
          </div>
          {/* Filter */}
          <div className={clsx('flex rounded-xl border p-1 gap-1', dark ? 'bg-[#0D1424] border-white/5' : 'bg-white border-gray-200')}>
            {FILTER_OPTIONS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={clsx('px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize',
                  filter === f ? 'text-white' : dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                )}
                style={filter === f ? { background:'linear-gradient(135deg,#4f46e5,#8b5cf6)' } : {}}
              >{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <StatCard key={s.label} dark={dark} {...s}
            value={s.label === 'Conversion Rate' ? parseFloat(totals.convRate) : s.value}
            suffix={s.label === 'Conversion Rate' ? '%' : s.suffix}
            delay={i * 80}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Line Chart */}
        <div className={clsx('lg:col-span-2 p-5 rounded-2xl border', dark ? 'bg-[#0D1424] border-white/5' : 'bg-white border-gray-100 shadow-sm')}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className={clsx('font-bold text-sm', dark ? 'text-white' : 'text-gray-900')}>User Growth</p>
              <p className={clsx('text-xs', dark ? 'text-gray-500' : 'text-gray-400')}>Visits & sessions over time</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#1e2a3a' : '#f1f5f9'} />
              <XAxis dataKey="date" tick={{ fontSize:10, fill: dark?'#4b5563':'#9ca3af' }} tickLine={false} axisLine={false} interval={range===7?0:4} />
              <YAxis tick={{ fontSize:10, fill: dark?'#4b5563':'#9ca3af' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              {Object.keys(chartData[0]||{}).filter(k=>k!=='date').map((key, i) => (
                <Line key={key} type="monotone" dataKey={key} stroke={i===0?'#4f46e5':'#22d3ee'} strokeWidth={2} dot={false} activeDot={{ r:4, fill: i===0?'#4f46e5':'#22d3ee' }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={clsx('p-5 rounded-2xl border', dark ? 'bg-[#0D1424] border-white/5' : 'bg-white border-gray-100 shadow-sm')}>
          <p className={clsx('font-bold text-sm mb-1', dark ? 'text-white' : 'text-gray-900')}>Traffic Sources</p>
          <p className={clsx('text-xs mb-4', dark ? 'text-gray-500' : 'text-gray-400')}>Where your users come from</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={sources} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {sources.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: dark?'#0D1424':'white', border: dark?'1px solid rgba(255,255,255,0.1)':'1px solid #e5e7eb', borderRadius:'12px', fontSize:'12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sources.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:s.color}} />
                  <span className={clsx('text-xs', dark?'text-gray-400':'text-gray-600')}>{s.name}</span>
                </div>
                <span className={clsx('text-xs font-bold', dark?'text-gray-300':'text-gray-700')}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className={clsx('p-5 rounded-2xl border', dark ? 'bg-[#0D1424] border-white/5' : 'bg-white border-gray-100 shadow-sm')}>
        <p className={clsx('font-bold text-sm mb-1', dark ? 'text-white' : 'text-gray-900')}>Sessions per Day</p>
        <p className={clsx('text-xs mb-6', dark ? 'text-gray-500' : 'text-gray-400')}>Daily session volume</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barData} margin={{ top:0, right:5, left:-20, bottom:0 }} barSize={range===7?24:8}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark?'#1e2a3a':'#f1f5f9'} vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize:10, fill: dark?'#4b5563':'#9ca3af' }} tickLine={false} axisLine={false} interval={range===7?0:4} />
            <YAxis tick={{ fontSize:10, fill: dark?'#4b5563':'#9ca3af' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="Sessions" radius={[4,4,0,0]}>
              {barData.map((_, i) => <Cell key={i} fill={`rgba(79,70,229,${0.4 + (i/barData.length)*0.6})`} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
