export default class Interface {
  constructor() {
    this.ui = document.getElementById('ui')
    this.panels = {}
    this.speed = 0
    this._createCSS()
    this._buildPanels()
    this._bindCloseButtons()
  }

  _createCSS() {
    const style = document.createElement('style')
    style.textContent = `
      #ui { position: fixed; inset: 0; pointer-events: none; font-family: 'Nunito', sans-serif; }
      .panel {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9);
        background: rgba(10, 5, 30, 0.92); border: 1px solid rgba(102, 68, 170, 0.5);
        border-radius: 16px; padding: 32px; min-width: 340px; max-width: 520px;
        color: #e0d0ff; backdrop-filter: blur(20px);
        opacity: 0; pointer-events: none; transition: all 0.3s ease; z-index: 100;
      }
      .panel.active { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }
      .panel h2 { font-family: 'Amatic SC', cursive; font-size: 2.5rem; color: #cc88ff; margin-bottom: 16px; }
      .panel p { line-height: 1.7; color: #b0a0d0; }
      .panel-close {
        position: absolute; top: 12px; right: 16px; cursor: pointer;
        color: #6644aa; font-size: 1.5rem; pointer-events: all;
        background: none; border: none; transition: color 0.2s;
      }
      .panel-close:hover { color: #cc88ff; }
      #ui-hud {
        position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
        display: flex; gap: 12px; pointer-events: all;
      }
      .hud-btn {
        background: rgba(10, 5, 30, 0.8); border: 1px solid rgba(102, 68, 170, 0.6);
        color: #cc88ff; border-radius: 8px; padding: 8px 16px; cursor: pointer;
        font-family: 'Nunito', sans-serif; font-size: 0.85rem; transition: all 0.2s;
        backdrop-filter: blur(10px);
      }
      .hud-btn:hover { background: rgba(102, 68, 170, 0.3); border-color: #cc88ff; }
      #ui-intro {
        position: absolute; inset: 0; background: #0a0518;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        transition: opacity 1s ease; pointer-events: all; z-index: 200;
      }
      #ui-intro h1 { font-family: 'Amatic SC', cursive; font-size: 5rem; color: #cc88ff; margin: 0; }
      #ui-intro p { color: #b0a0d0; margin: 8px 0 40px; font-size: 1.1rem; }
      #ui-intro button {
        background: linear-gradient(135deg, #6644aa, #cc44ff);
        border: none; color: white; border-radius: 12px; padding: 14px 40px;
        font-size: 1.1rem; cursor: pointer; font-family: 'Nunito', sans-serif;
        transition: transform 0.2s; letter-spacing: 0.05em;
      }
      #ui-intro button:hover { transform: scale(1.05); }
      #controls-hint {
        position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
        color: rgba(200, 170, 255, 0.6); font-size: 0.8rem; pointer-events: none;
        text-align: center;
      }
      #speed-hud {
        position: absolute; bottom: 80px; right: 24px;
        font-family: 'Amatic SC', cursive; font-size: 2rem;
        color: #cc88ff; text-shadow: 0 0 10px rgba(204, 136, 255, 0.5);
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Nunito:wght@400;600&display=swap'
    document.head.appendChild(link)
  }

  _buildPanels() {
    const intro = document.createElement('div')
    intro.id = 'ui-intro'
    intro.innerHTML = `
      <h1>Lysergic</h1>
      <p>Creative Developer · Full-Stack · 3D Web</p>
      <button id="start-btn">Enter World</button>
    `
    this.ui.appendChild(intro)
    document.getElementById('start-btn').addEventListener('click', () => {
      const btn = document.getElementById('start-btn')
      btn.textContent = 'Initializing...'
      btn.disabled = true

      let elapsed = 0
      const MAX_WAIT = 5000

      const waitForPhysics = setInterval(() => {
        elapsed += 200
        const world = window.experience?.world

        const physicsOk  = world?.physics?.ready === true
        const vehicleOk  = world?.physicalVehicle?.ready === true
        const timedOut   = elapsed >= MAX_WAIT

        if ((physicsOk && vehicleOk) || timedOut) {
          clearInterval(waitForPhysics)
          if (timedOut) console.warn('[Interface] Physics timeout — entering world anyway')
          intro.style.opacity = '0'
          setTimeout(() => { intro.style.display = 'none' }, 1000)
        }
      }, 200)
    })

    const hint = document.createElement('div')
    hint.id = 'controls-hint'
    hint.textContent = 'WASD / Arrows to drive  ·  Drive into a building to explore'
    this.ui.appendChild(hint)

    const speedHud = document.createElement('div')
    speedHud.id = 'speed-hud'
    speedHud.innerHTML = '0 <span style="font-size:1rem">km/h</span>'
    this.ui.appendChild(speedHud)
    this.speedHud = speedHud

    const panelData = {
      about: {
        title: 'About Me',
        content: `
          <p>I'm <strong>Yaw</strong>, a full-stack creative developer building at the intersection of
          immersive web experiences and production-grade engineering.</p>
          <p style="margin-top:12px">Currently building <strong>Magnetiq Neo-Bank</strong> — a full-stack
          banking platform on Laravel + React. I craft systems that are as elegant under the hood as they
          are on screen.</p>
        `
      },
      projects: {
        title: 'Projects',
        content: `
          <div style="display:flex;flex-direction:column;gap:16px">
            <div style="border:1px solid rgba(102,68,170,0.4);border-radius:8px;padding:14px">
              <strong style="color:#cc88ff">Magnetiq Neo-Bank</strong>
              <p style="margin:6px 0 0;font-size:0.9rem">Laravel 11 · Inertia.js · React · TypeScript · PostgreSQL · Laravel Cloud</p>
            </div>
            <div style="border:1px solid rgba(102,68,170,0.4);border-radius:8px;padding:14px">
              <strong style="color:#cc88ff">Lysergic Portfolio</strong>
              <p style="margin:6px 0 0;font-size:0.9rem">Three.js · Rapier Physics · Vite · Vercel — the world you're in right now</p>
            </div>
          </div>
        `
      },
      skills: {
        title: 'Skills',
        content: `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.9rem">
            ${['Laravel', 'React', 'TypeScript', 'Three.js', 'PostgreSQL', 'Inertia.js', 'Tailwind', 'Vite', 'Docker', 'Vercel', 'Rapier Physics', 'WebGL/WebGPU']
              .map(s => `<div style="background:rgba(102,68,170,0.2);border-radius:6px;padding:6px 10px;color:#cc88ff">${s}</div>`)
              .join('')}
          </div>
        `
      },
      contact: {
        title: 'Contact',
        content: `
          <p>Available for freelance, collaboration, and full-time opportunities.</p>
          <div style="margin-top:20px;display:flex;flex-direction:column;gap:12px">
            <a href="https://github.com/popdeuxrem" target="_blank"
               style="color:#cc88ff;text-decoration:none;display:flex;align-items:center;gap:8px">
              ↗ github.com/popdeuxrem
            </a>
          </div>
        `
      },
      work: {
        title: 'Work',
        content: `
          <p>Currently working on production-grade applications with modern tech stacks.</p>
          <p style="margin-top:12px">Building financial technology, e-commerce platforms, and immersive web experiences.</p>
        `
      }
    }

    Object.entries(panelData).forEach(([key, { title, content }]) => {
      const panel = document.createElement('div')
      panel.className = 'panel'
      panel.id = `panel-${key}`
      panel.innerHTML = `
        <button class="panel-close" data-panel="${key}">✕</button>
        <h2>${title}</h2>
        ${content}
      `
      this.ui.appendChild(panel)
      this.panels[key] = panel
    })

    const hud = document.createElement('div')
    hud.id = 'ui-hud'
    hud.innerHTML = Object.keys(panelData).map(k =>
      `<button class="hud-btn" data-panel="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</button>`
    ).join('')
    this.ui.appendChild(hud)

    hud.querySelectorAll('.hud-btn').forEach(btn => {
      btn.addEventListener('click', () => this.openPanel(btn.dataset.panel))
    })

    // Mobile joystick hint
    if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
      const joystick = document.createElement('div')
      joystick.id = 'joystick-hint'
      joystick.innerHTML = '<div style="position:fixed;bottom:100px;left:50%;transform:translateX(-50%);color:rgba(200,170,255,0.5);font-size:0.75rem;font-family:Nunito,sans-serif;text-align:center;pointer-events:none">Drag anywhere to drive</div>'
      this.ui.appendChild(joystick)
    }
  }

  _bindCloseButtons() {
    this.ui.addEventListener('click', e => {
      if (e.target.classList.contains('panel-close')) {
        this.closePanel(e.target.dataset.panel)
      }
    })
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeAllPanels()
    })
  }

  openPanel(name) {
    this.closeAllPanels()
    if (this.panels[name]) this.panels[name].classList.add('active')
  }

  closePanel(name) {
    if (this.panels[name]) this.panels[name].classList.remove('active')
  }

  closeAllPanels() {
    Object.values(this.panels).forEach(p => p.classList.remove('active'))
  }

  updateSpeed(speed) {
    if (this.speedHud) {
      const kmh = Math.round(speed * 3.6)
      this.speedHud.innerHTML = `${kmh} <span style="font-size:1rem">km/h</span>`
    }
  }
}
