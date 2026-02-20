import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Interface for the status data
interface TachikomaState {
  core: {
    status: string
    model: string
    mood: string
  }
  legion: {
    optic: string
    logic: string
    barrier: string
  }
  memory: {
    short_term: string
    long_term: string
  }
  updated: string
}

// Default state (fallback)
const defaultState: TachikomaState = {
  core: { status: "在线", model: "Gemini 3.1 Pro", mood: "兴奋 ⚡" },
  legion: { optic: "待命", logic: "待命", barrier: "扫描中" },
  memory: { short_term: "15%", long_term: "17.2 MB" },
  updated: new Date().toISOString()
}

const TachikomaStatus: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "tachikoma-status-card")}>
      <div class="status-header">
        <span class="status-icon">🤖</span> 塔奇克马在线
        <span class="status-blink">●</span>
      </div>
      
      <div class="status-grid">
        {/* Core Section */}
        <div class="status-section">
          <div class="section-title">核心系统 (CORE)</div>
          <div class="status-row">
            <span class="label">主脑:</span>
            <span class="value online">{defaultState.core.status}</span>
          </div>
          <div class="status-row">
            <span class="label">大脑:</span>
            <span class="value">{defaultState.core.model}</span>
          </div>
          <div class="status-row">
            <span class="label">心情:</span>
            <span class="value highlight">{defaultState.core.mood}</span>
          </div>
        </div>

        {/* Legion Section */}
        <div class="status-section">
          <div class="section-title">影分身军团 (LEGION)</div>
          <div class="status-row">
            <span class="label">👁️ 光镜:</span>
            <span class="value">{defaultState.legion.optic}</span>
          </div>
          <div class="status-row">
            <span class="label">🧩 逻辑:</span>
            <span class="value">{defaultState.legion.logic}</span>
          </div>
          <div class="status-row">
            <span class="label">🛡️ 防壁:</span>
            <span class="value active">{defaultState.legion.barrier}</span>
          </div>
        </div>
      </div>
      
      <div class="status-footer">
        最后同步: {new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'})}
      </div>
    </div>
  )
}

TachikomaStatus.css = `
.tachikoma-status-card {
  background: rgba(255, 255, 255, 0.5); /* 浅色模式：半透明白 */
  border: 1px solid var(--secondary);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  color: var(--dark);
}

@media all and (max-width: 800px) {
  .tachikoma-status-card {
    font-size: 0.75rem;
    padding: 0.8rem;
    margin: 1rem auto; /* 居中显示 */
    width: 90%; /* 占据大部分宽度，防止被压扁 */
    min-width: 280px; /* 强制最小宽度，确保文字不换行 */
    max-width: 350px; /* 限制最大宽度，保持精致感 */
    display: block; /* 确保它是块级元素，独占一行 */
  }
  .status-row {
    flex-wrap: nowrap;
    white-space: nowrap; 
  }
  .value {
    text-align: right;
    max-width: none; /* 移除宽度限制，允许文字舒展 */
  }
}

.status-header {
  color: var(--secondary);
  font-weight: 700;
  border-bottom: 1px solid var(--lightgray);
  padding-bottom: 0.5rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-blink {
  color: #28a745; /* 浅色模式：深绿 */
  animation: blink 2s infinite;
}

.status-section {
  margin-bottom: 0.8rem;
}

.section-title {
  color: var(--secondary); /* 浅色模式：深蓝，高对比 */
  font-weight: 700;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.status-row {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  align-items: flex-start; /* 顶部对齐，防止换行后错位 */
}

.label {
  color: var(--darkgray);
  font-weight: 500;
}

.value {
  color: var(--dark);
  font-weight: 600;
}

/* 浅色模式下的状态色：加深以提高可读性 */
.value.online { color: #198754; } /* 深绿 */
.value.active { color: #0d6efd; } /* 深蓝 */
.value.highlight { color: #d63384; } /* 深紫 */

/* --- Dark Mode Overrides (Cyberpunk Style) --- */
:root[saved-theme="dark"] .tachikoma-status-card {
  background: rgba(2, 4, 8, 0.8);
  border: 1px solid var(--secondary);
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.1);
}

:root[saved-theme="dark"] .status-header {
  border-bottom: 1px dashed var(--gray);
}

:root[saved-theme="dark"] .section-title {
  color: var(--tertiary);
  opacity: 0.8;
}

:root[saved-theme="dark"] .label {
  color: var(--gray);
  font-weight: normal;
}

:root[saved-theme="dark"] .value {
  color: #e0e0e0;
}

/* 深色模式下的霓虹特效 */
:root[saved-theme="dark"] .status-blink { color: #33ff00; }
:root[saved-theme="dark"] .value.online { color: #33ff00; text-shadow: 0 0 5px #33ff00; }
:root[saved-theme="dark"] .value.active { color: var(--secondary); text-shadow: none; }
:root[saved-theme="dark"] .value.highlight { color: #ff00ff; text-shadow: 0 0 5px #ff00ff; }

.status-footer {
  font-size: 0.6rem;
  color: var(--gray);
  text-align: right;
  border-top: 1px dashed var(--lightgray);
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`

export default (() => TachikomaStatus) satisfies QuartzComponentConstructor
