import { useMemo, useState } from 'react'
import { COLUMNS, MEMBERS, INITIAL_TASKS, WEEKLY } from './data.js'

const memberById = Object.fromEntries(MEMBERS.map((m) => [m.id, m]))

const PRIORITY = {
  high: { label: '高', cls: 'bg-rose-500/15 text-rose-300 ring-rose-500/30' },
  medium: { label: '中', cls: 'bg-amber-500/15 text-amber-300 ring-amber-500/30' },
  low: { label: '低', cls: 'bg-slate-500/15 text-slate-300 ring-slate-500/30' },
}

const TAG_CLS = {
  Design: 'bg-indigo-500/15 text-indigo-300',
  Frontend: 'bg-sky-500/15 text-sky-300',
  Backend: 'bg-violet-500/15 text-violet-300',
  Research: 'bg-emerald-500/15 text-emerald-300',
  Growth: 'bg-pink-500/15 text-pink-300',
  QA: 'bg-amber-500/15 text-amber-300',
  DevOps: 'bg-teal-500/15 text-teal-300',
  Ops: 'bg-slate-500/15 text-slate-300',
}

function Avatar({ id, ring = false }) {
  const m = memberById[id]
  if (!m) return null
  return (
    <div
      title={m.name}
      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white ${m.color} ${
        ring ? 'ring-2 ring-ink-850' : ''
      }`}
    >
      {m.name[0]}
    </div>
  )
}

function Icon({ path, className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  )
}

const icons = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
  board: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 4-5" /></>,
  team: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
  comment: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  flame: <><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 0 2 1 3 2 3 1 0 1-1 1-2 0-2-2-4 0-6z" /></>,
  trend: <><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
}

const NAV = [
  { id: 'overview', label: '總覽', icon: icons.grid },
  { id: 'board', label: '看板', icon: icons.board },
  { id: 'calendar', label: '行事曆', icon: icons.calendar },
  { id: 'reports', label: '報表', icon: icons.chart },
  { id: 'team', label: '團隊', icon: icons.team },
]

function StatCard({ label, value, delta, up, spark }) {
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-850 p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <span className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
          <Icon path={icons.trend} className={`h-3.5 w-3.5 ${up ? '' : 'rotate-180'}`} />
          {delta}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        {spark}
      </div>
    </div>
  )
}

function MiniBars({ data }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-1" aria-hidden>
      {data.map((d, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-accent/70"
          style={{ height: `${12 + (d.value / max) * 28}px` }}
        />
      ))}
    </div>
  )
}

function TaskCard({ task, onMove, columns }) {
  const idx = columns.findIndex((c) => c.id === task.status)
  const [done, total] = task.checks
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="group rounded-xl border border-ink-700/60 bg-ink-800 p-4 transition hover:border-accent/50 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-center justify-between">
        <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${TAG_CLS[task.tag] || 'bg-slate-500/15 text-slate-300'}`}>
          {task.tag}
        </span>
        <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${PRIORITY[task.priority].cls}`}>
          {PRIORITY[task.priority].label}
        </span>
      </div>

      <h4 className="mt-3 text-sm font-semibold leading-snug text-slate-100">{task.title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{task.desc}</p>

      {total > 0 && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px] text-slate-500">
            <span>子任務</span>
            <span>{done}/{total}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
            <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><Icon path={icons.clock} className="h-3.5 w-3.5" />{task.due}</span>
          <span className="flex items-center gap-1"><Icon path={icons.comment} className="h-3.5 w-3.5" />{task.comments}</span>
        </div>
        <Avatar id={task.assignee} />
      </div>

      <div className="mt-3 flex gap-1.5 opacity-0 transition group-hover:opacity-100">
        <button
          disabled={idx === 0}
          onClick={() => onMove(task.id, -1)}
          className="flex-1 rounded-lg border border-ink-700 px-2 py-1 text-[11px] text-slate-400 transition enabled:hover:border-accent enabled:hover:text-accent-soft disabled:opacity-30"
        >
          ← 退回
        </button>
        <button
          disabled={idx === columns.length - 1}
          onClick={() => onMove(task.id, 1)}
          className="flex-1 rounded-lg border border-ink-700 px-2 py-1 text-[11px] text-slate-400 transition enabled:hover:border-accent enabled:hover:text-accent-soft disabled:opacity-30"
        >
          推進 →
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState('board')
  const [query, setQuery] = useState('')
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const moveTask = (id, dir) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const idx = COLUMNS.findIndex((c) => c.id === t.status)
        const next = Math.min(Math.max(idx + dir, 0), COLUMNS.length - 1)
        return { ...t, status: COLUMNS[next].id }
      })
    )
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    )
  }, [tasks, query])

  const counts = useMemo(() => {
    const c = { total: tasks.length, done: 0, progress: 0, todo: 0 }
    tasks.forEach((t) => {
      if (t.status === 'done') c.done++
      else if (t.status === 'todo') c.todo++
      else c.progress++
    })
    return c
  }, [tasks])

  const completion = Math.round((counts.done / counts.total) * 100)

  return (
    <div className="flex min-h-screen bg-ink-950 text-slate-200">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-800 bg-ink-900 p-5 md:flex">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
            <Icon path={icons.board} className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none text-white">Flow</p>
            <p className="mt-1 text-[11px] text-slate-500">Project Workspace</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active === item.id
                  ? 'bg-accent/15 text-accent-soft'
                  : 'text-slate-400 hover:bg-ink-800 hover:text-slate-200'
              }`}
            >
              <Icon path={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-1 pt-6">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-ink-800 hover:text-slate-200">
            <Icon path={icons.settings} />
            設定
          </button>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-ink-850 p-3">
            <Avatar id="pc" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">Percy</p>
              <p className="truncate text-[11px] text-slate-500">Product Designer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-ink-800 bg-ink-950/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold text-white">產品設計衝刺</h1>
            <p className="text-xs text-slate-500">Sprint 14 · 6/16 – 6/30</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden sm:block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Icon path={icons.search} className="h-4 w-4" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋任務…"
                className="w-56 rounded-xl border border-ink-700 bg-ink-850 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <button className="relative rounded-xl border border-ink-700 bg-ink-850 p-2.5 text-slate-400 transition hover:text-slate-200">
              <Icon path={icons.bell} className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-soft">
              <Icon path={icons.plus} className="h-4 w-4" />
              新增任務
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Stats */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="任務總數" value={counts.total} delta="12%" up spark={<MiniBars data={WEEKLY} />} />
            <StatCard label="進行中" value={counts.progress} delta="3%" up spark={<MiniBars data={WEEKLY.slice().reverse()} />} />
            <StatCard label="已完成" value={counts.done} delta="8%" up spark={<MiniBars data={WEEKLY} />} />
            <StatCard
              label="完成率"
              value={`${completion}%`}
              delta="2%"
              up={false}
              spark={
                <div className="relative h-12 w-12">
                  <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#262c3a" strokeWidth="4" />
                    <circle
                      cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${(completion / 100) * 94.2} 94.2`}
                    />
                  </svg>
                </div>
              }
            />
          </section>

          {/* Sprint progress bar */}
          <section className="rounded-2xl border border-ink-700/60 bg-ink-850 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon path={icons.flame} className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-100">衝刺進度</h3>
                <span className="text-xs text-slate-500">距離結束還有 12 天</span>
              </div>
              <div className="flex -space-x-2">
                {MEMBERS.map((m) => <Avatar key={m.id} id={m.id} ring />)}
              </div>
            </div>
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-ink-700">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>{counts.done} / {counts.total} 任務完成</span>
              <span>{completion}%</span>
            </div>
          </section>

          {/* Board */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => {
              const colTasks = filtered.filter((t) => t.status === col.id)
              return (
                <div key={col.id} className="flex flex-col rounded-2xl border border-ink-800 bg-ink-900/60 p-3">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${col.accent}`}>{col.title}</span>
                      <span className="rounded-full bg-ink-800 px-2 py-0.5 text-[11px] text-slate-400">{colTasks.length}</span>
                    </div>
                    <button className="text-slate-500 transition hover:text-slate-300">
                      <Icon path={icons.plus} className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {colTasks.map((t) => (
                      <TaskCard key={t.id} task={t} onMove={moveTask} columns={COLUMNS} />
                    ))}
                    {colTasks.length === 0 && (
                      <div className="rounded-xl border border-dashed border-ink-700 px-3 py-8 text-center text-xs text-slate-600">
                        沒有任務
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </section>
        </main>
      </div>
    </div>
  )
}
