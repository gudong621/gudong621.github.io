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
  core: { status: "ONLINE", model: "Gemini 3.1 Pro", mood: "EXCITED ⚡" },
  legion: { optic: "IDLE", logic: "STANDBY", barrier: "SCANNING" },
  memory: { short_term: "15%", long_term: "17.2 MB" },
  updated: new Date().toISOString()
}

const TachikomaStatus: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "tachikoma-status-card")}>
      <div class="status-header">
        <span class="status-icon">🤖</span> TACHIKOMA LIVE
        <span class="status-blink">●</span>
      </div>
      
      <div class="status-grid">
        {/* Core Section */}
        <div class="status-section">
          <div class="section-title">CORE SYSTEM</div>
          <div class="status-row">
            <span class="label">MAIN:</span>
            <span class="value online">{defaultState.core.status}</span>
          </div>
          <div class="status-row">
            <span class="label">BRAIN:</span>
            <span class="value">{defaultState.core.model}</span>
          </div>
          <div class="status-row">
            <span class="label">MOOD:</span>
            <span class="value highlight">{defaultState.core.mood}</span>
          </div>
        </div>

        {/* Legion Section */}
        <div class="status-section">
          <div class="section-title">GHOST LEGION</div>
          <div class="status-row">
            <span class="label">👁️ OPTIC:</span>
            <span class="value">{defaultState.legion.optic}</span>
          </div>
          <div class="status-row">
            <span class="label">🧩 LOGIC:</span>
            <span class="value">{defaultState.legion.logic}</span>
          </div>
          <div class="status-row">
            <span class="label">🛡️ BARRIER:</span>
            <span class="value active">{defaultState.legion.barrier}</span>
          </div>
        </div>
      </div>
      
      <div class="status-footer">
        LAST SYNC: {new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'})}
      </div>
    </div>
  )
}

TachikomaStatus.css = `
.tachikoma-status-card {
  background: var(--lightgray);
  border: 1px solid var(--secondary);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 242, 255, 0.05);
  backdrop-filter: blur(5px);
  color: var(--dark);
}

@media all and (max-width: 800px) {
  .tachikoma-status-card {
    font-size: 0.7rem;
    padding: 0.8rem;
    margin: 0.5rem 0;
  }
  .status-row {
    white-space: nowrap;
  }
}

.status-header {
  color: var(--secondary);
  font-weight: bold;
  border-bottom: 1px dashed var(--gray);
  padding-bottom: 0.5rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-blink {
  color: var(--tertiary);
  animation: blink 2s infinite;
}

.status-section {
  margin-bottom: 0.8rem;
}

.section-title {
  color: var(--gray);
  font-weight: bold;
  font-size: 0.7rem;
  opacity: 0.8;
  margin-bottom: 0.3rem;
  letter-spacing: 1px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  line-height: 1.4;
}

.label {
  color: var(--darkgray);
}

.value {
  color: var(--dark);
  font-weight: 500;
}

.value.online { color: var(--tertiary); text-shadow: 0 0 5px var(--tertiary); }
.value.active { color: var(--secondary); }
.value.highlight { color: #ff00ff; }

/* Dark mode specific overrides for extra Cyberpunk feel */
:root[saved-theme="dark"] .tachikoma-status-card {
  background: rgba(2, 4, 8, 0.6);
  border: 1px solid var(--secondary);
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.1);
}

:root[saved-theme="dark"] .value {
  color: #e0e0e0;
}

.status-footer {
  font-size: 0.6rem;
  color: var(--gray);
  text-align: right;
  border-top: 1px dashed var(--gray);
  padding-top: 0.5rem;
  opacity: 0.6;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`

export default (() => TachikomaStatus) satisfies QuartzComponentConstructor
