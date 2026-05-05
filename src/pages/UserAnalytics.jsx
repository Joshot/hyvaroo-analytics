import { useState } from 'react'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const STATUS_COLORS = {
  Active:   { bg:'bg-green-400/10',  text:'text-green-400',  dot:'bg-green-400' },
  Inactive: { bg:'bg-gray-400/10',   text:'text-gray-400',   dot:'bg-gray-400' },
}

function fmtTime(s) {
  const m = Math.floor(s / 60)
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`
}

export default function UserAnalytics({ dark, data }) {
  const { users } = data
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key:'id', dir:'asc' })
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  const filtered = users.filter(u =>
    u.id.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.activity.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    const mul = sort.dir === 'asc' ? 1 : -1
    if (sort.key === 'sessionTime' || sort.key === 'pages') return (a[sort.key] - b[sort.key]) * mul
    return a[sort.key].localeCompare(b[sort.key]) * mul
  })

  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const paged = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const toggleSort = (key) => setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))

  const SortIcon = ({ col }) => (
    <span className="ml-1 inline-flex flex-col gap-px">
      <ChevronUp size={10} className={sort.key === col && sort.dir === 'asc' ? 'text-indigo-400' : 'text-gray-600'} />
      <ChevronDown size={10} className={sort.key === col && sort.dir === 'desc' ? 'text-indigo-400' : 'text-gray-600'} />
    </span>
  )

  const activeCount = users.filter(u => u.status === 'Active').length

  return (
    <div className={clsx('min-h-screen p-6 lg:p-8', dark ? 'bg-[#0A0F1C]' : 'bg-[#F8FAFC]')}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={clsx('text-2xl font-black mb-1', dark ? 'text-white' : 'text-gray-900')}>User Analytics</h1>
        <p className={clsx('text-sm', dark ? 'text-gray-500' : 'text-gray-400')}>Track individual user sessions and behavior.</p>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label:'Total Users', value: users.length, color:'#4f46e5' },
          { label:'Active Now',  value: activeCount,  color:'#10b981' },
          { label:'Inactive',    value: users.length - activeCount, color:'#6b7280' },
        ].map(b => (
          <div key={b.label} className={clsx('flex items-center gap-2.5 px-4 py-2 rounded-xl border', dark?'bg-[#0D1424] border-white/5':'bg-white border-gray-100 shadow-sm')}>
            <span className="w-2 h-2 rounded-full" style={{background:b.color}} />
            <span className={clsx('text-xs font-medium', dark?'text-gray-400':'text-gray-600')}>{b.label}</span>
            <span className={clsx('text-sm font-black', dark?'text-white':'text-gray-900')}>{b.value}</span>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className={clsx('rounded-2xl border overflow-hidden', dark?'bg-[#0D1424] border-white/5':'bg-white border-gray-100 shadow-sm')}>
        {/* Search */}
        <div className={clsx('flex items-center gap-3 px-5 py-4 border-b', dark?'border-white/5':'border-gray-100')}>
          <Search size={15} className={dark?'text-gray-600':'text-gray-400'} />
          <input
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search users..."
            className={clsx('flex-1 bg-transparent text-sm outline-none', dark?'text-white placeholder-gray-600':'text-gray-900 placeholder-gray-400')}
          />
          <span className={clsx('text-xs', dark?'text-gray-600':'text-gray-400')}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={clsx('text-left', dark?'bg-white/3':'bg-gray-50')}>
                {[['id','User ID'],['activity','Last Activity'],['sessionTime','Session'],['pages','Pages'],['status','Status']].map(([key, label]) => (
                  <th key={key} onClick={() => toggleSort(key)}
                    className={clsx('px-5 py-3 text-xs font-bold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap', dark?'text-gray-500 hover:text-gray-300':'text-gray-400 hover:text-gray-600')}
                  >{label}<SortIcon col={key} /></th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: dark?'rgba(255,255,255,0.04)':'#f1f5f9'}}>
              {paged.map((u, i) => (
                <tr key={u.id} className={clsx('transition-colors', dark?'hover:bg-white/2':'hover:bg-gray-50')}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                        style={{background:`hsl(${(i*47)%360},60%,55%)`}}>
                        {u.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className={clsx('font-semibold text-xs', dark?'text-white':'text-gray-900')}>{u.id}</p>
                        <p className={clsx('text-[11px]', dark?'text-gray-600':'text-gray-400')}>{u.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className={clsx('px-5 py-3.5 text-xs', dark?'text-gray-400':'text-gray-600')}>{u.activity}</td>
                  <td className={clsx('px-5 py-3.5 text-xs font-semibold', dark?'text-gray-300':'text-gray-700')}>{fmtTime(u.sessionTime)}</td>
                  <td className={clsx('px-5 py-3.5 text-xs font-semibold', dark?'text-gray-300':'text-gray-700')}>{u.pages}</td>
                  <td className="px-5 py-3.5">
                    <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold', STATUS_COLORS[u.status].bg, STATUS_COLORS[u.status].text)}>
                      <span className={clsx('w-1.5 h-1.5 rounded-full', STATUS_COLORS[u.status].dot)} />
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={clsx('flex items-center justify-between px-5 py-3 border-t text-xs', dark?'border-white/5 text-gray-500':'border-gray-100 text-gray-400')}>
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
              className={clsx('px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-30', dark?'hover:bg-white/5':'hover:bg-gray-100')}>Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
              className={clsx('px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-30', dark?'hover:bg-white/5':'hover:bg-gray-100')}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
