export const COLUMNS = [
  { id: 'todo', title: 'To Do', accent: 'text-slate-300' },
  { id: 'progress', title: 'In Progress', accent: 'text-indigo-300' },
  { id: 'review', title: 'Review', accent: 'text-amber-300' },
  { id: 'done', title: 'Done', accent: 'text-emerald-300' },
]

export const MEMBERS = [
  { id: 'pc', name: 'Percy', color: 'bg-indigo-500' },
  { id: 'ja', name: 'Jasmine', color: 'bg-rose-500' },
  { id: 'ke', name: 'Kevin', color: 'bg-emerald-500' },
  { id: 'mi', name: 'Mina', color: 'bg-amber-500' },
  { id: 'le', name: 'Leo', color: 'bg-sky-500' },
]

export const INITIAL_TASKS = [
  { id: 't1', title: '重新設計登入流程', desc: '簡化三步驟註冊,加入 SSO 選項。', status: 'progress', priority: 'high', tag: 'Design', due: '6/22', assignee: 'pc', comments: 4, checks: [2, 5] },
  { id: 't2', title: '建立元件庫 v2', desc: '同步 Figma tokens 至 Tailwind config。', status: 'progress', priority: 'medium', tag: 'Frontend', due: '6/25', assignee: 'ke', comments: 2, checks: [6, 9] },
  { id: 't3', title: '使用者訪談分析', desc: '整理 12 位受訪者的痛點與洞察。', status: 'review', priority: 'medium', tag: 'Research', due: '6/20', assignee: 'mi', comments: 7, checks: [4, 4] },
  { id: 't4', title: 'API 速率限制', desc: '為公開端點加入分層限流。', status: 'todo', priority: 'high', tag: 'Backend', due: '6/28', assignee: 'le', comments: 1, checks: [0, 3] },
  { id: 't5', title: '行銷頁 A/B 測試', desc: '測試兩種 hero 文案轉換率。', status: 'todo', priority: 'low', tag: 'Growth', due: '7/01', assignee: 'ja', comments: 0, checks: [0, 2] },
  { id: 't6', title: '無障礙審查', desc: '通過 WCAG AA 對比與鍵盤導覽。', status: 'todo', priority: 'medium', tag: 'QA', due: '6/30', assignee: 'mi', comments: 3, checks: [1, 8] },
  { id: 't7', title: '上線 v1.4 釋出', desc: '部署至 production 並監控指標。', status: 'done', priority: 'high', tag: 'DevOps', due: '6/15', assignee: 'ke', comments: 5, checks: [5, 5] },
  { id: 't8', title: '客服自動回覆', desc: '導入常見問題的範本回覆。', status: 'done', priority: 'low', tag: 'Ops', due: '6/12', assignee: 'ja', comments: 2, checks: [4, 4] },
  { id: 't9', title: '行動版排版修正', desc: '修正小尺寸下的看板溢出問題。', status: 'review', priority: 'high', tag: 'Frontend', due: '6/21', assignee: 'pc', comments: 6, checks: [3, 4] },
]

// 近 7 天完成任務數,用於迷你長條圖
export const WEEKLY = [
  { day: '一', value: 3 },
  { day: '二', value: 5 },
  { day: '三', value: 2 },
  { day: '四', value: 6 },
  { day: '五', value: 4 },
  { day: '六', value: 7 },
  { day: '日', value: 5 },
]
