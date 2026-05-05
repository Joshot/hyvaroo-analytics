import { Moon, Sun, Trash2, RefreshCw, Info, Bell, Shield, Palette } from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'

export default function SettingsPage({ dark, setDark, data }) {
  const { resetAll } = data
  const [resetConfirm, setResetConfirm] = useState(false)
  const [resetDone, setResetDone] = useState(false)
  const [notifs, setNotifs] = useState(true)
  const [compact, setCompact] = useState(false)

  const handleReset = () => {
    if (!resetConfirm) { setResetConfirm(true); return }
    resetAll()
    setResetDone(true)
    setResetConfirm(false)
    setTimeout(() => setResetDone(false), 3000)
  }

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)}
      className={clsx('relative w-11 h-6 rounded-full transition-all duration-300', value ? '' : dark?'bg-white/10':'bg-gray-200')}
      style={value ? {background:'linear-gradient(135deg,#4f46e5,#8b5cf6)'} : {}}
    >
      <span className={clsx('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300', value ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )

  const Section = ({ title, Icon, children }) => (
    <div className={clsx('rounded-2xl border p-5 mb-4', dark?'bg-[#0D1424] border-white/5':'bg-white border-gray-100 shadow-sm')}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center', dark?'bg-white/5':'bg-gray-100')}>
          <Icon size={15} className={dark?'text-indigo-400':'text-indigo-500'} />
        </div>
        <p className={clsx('font-bold text-sm', dark?'text-white':'text-gray-900')}>{title}</p>
      </div>
      {children}
    </div>
  )

  const Row = ({ label, sub, right }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{borderColor:dark?'rgba(255,255,255,0.04)':'#f1f5f9'}}>
      <div>
        <p className={clsx('text-sm font-medium', dark?'text-gray-200':'text-gray-800')}>{label}</p>
        {sub && <p className={clsx('text-xs mt-0.5', dark?'text-gray-600':'text-gray-400')}>{sub}</p>}
      </div>
      {right}
    </div>
  )

  return (
    <div className={clsx('min-h-screen p-6 lg:p-8', dark ? 'bg-[#0A0F1C]' : 'bg-[#F8FAFC]')}>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className={clsx('text-2xl font-black mb-1', dark?'text-white':'text-gray-900')}>Settings</h1>
          <p className={clsx('text-sm', dark?'text-gray-500':'text-gray-400')}>Manage your dashboard preferences.</p>
        </div>

        <Section title="Appearance" Icon={Palette}>
          <Row label="Dark Mode" sub="Switch between dark and light theme"
            right={<Toggle value={dark} onChange={setDark} />} />
          <Row label="Compact View" sub="Show more data in less space"
            right={<Toggle value={compact} onChange={setCompact} />} />
        </Section>

        <Section title="Notifications" Icon={Bell}>
          <Row label="Enable Notifications" sub="Receive alerts for key metric changes"
            right={<Toggle value={notifs} onChange={setNotifs} />} />
        </Section>

        <Section title="Data Management" Icon={Trash2}>
          <Row label="Reset Dashboard Data" sub="Clear all localStorage data and regenerate dummy data"
            right={
              <button onClick={handleReset}
                className={clsx('flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all',
                  resetDone ? 'bg-green-500/15 text-green-400' :
                  resetConfirm ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                  dark ? 'bg-white/5 text-gray-400 hover:bg-red-500/15 hover:text-red-400' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                )}
              >
                {resetDone ? <><RefreshCw size={12}/>Done!</> : resetConfirm ? <><Trash2 size={12}/>Confirm Reset</> : <><Trash2 size={12}/>Reset Data</>}
              </button>
            }
          />
        </Section>

        <Section title="About" Icon={Info}>
          <Row label="Version" right={<span className={clsx('text-xs font-mono font-semibold', dark?'text-gray-500':'text-gray-400')}>v1.0.0</span>} />
          <Row label="Build" right={<span className={clsx('text-xs font-mono font-semibold', dark?'text-gray-500':'text-gray-400')}>2026.05</span>} />
          <Row label="Brand" right={<span className="text-xs font-semibold text-gradient">Hyvaroo Labs</span>} />
        </Section>
      </div>
    </div>
  )
}
