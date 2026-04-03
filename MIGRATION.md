# Bruno Simon folio-2025 Migration Inventory

## Overview
Exact file inventory and architecture guide based on `bruno-folio-reference/` clone.

---

## 1. PACKAGE MANAGER & SCRIPTS

### package.json
```json
{
  "scripts": {
    "dev": "vite --mode development",
    "build": "vite build --mode production",
    "preview": "vite preview",
    "compress": "node scripts/compress.js static/"
  },
  "dependencies": {
    "@dimforge/rapier3d": "^0.17.3",
    "three": "^0.183.2",
    "gsap": "^3.12.5",
    "howler": "^2.2.4",
    "tweakpane": "^4.0.4",
    "vite": "^7.2.4",
    // ... plus glTF tools, sharp, etc.
  }
}
```

---

## 2. VITE CONFIG

**File:** `vite.config.js`
```js
export default {
    root: 'sources/',           // Entry point is sources/index.html
    envDir: '../',            // .env at repo root
    publicDir: '../static/',   // Static assets at repo root/static
    base: './',              // Relative paths
    build: { outDir: '../dist' },
    plugins: [wasm(), topLevelAwait(), restart(), nodePolyfills()]
}
```

---

## 3. DIRECTORY STRUCTURE

```
bruno-folio-reference/
├── sources/              # Source code (root in vite config)
│   ├── index.html       # Main HTML entry
│   ├── index.js        # Main JS entry (imports Game)
│   ├── Game/         # All core runtime (50+ modules)
│   │   ├── Game.js          # Main game class
│   │   ├── Player.js        # Vehicle/walking player
│   │   ├── Physics/        # Rapier physics
│   │   ├── View.js        # Camera control
│   │   ├── World/        # World zones
│   │   ├── Audio.js       # Sound system
│   │   ├── Modals.js      # UI panels
│   │   └── ...
│   ├── data/           # Static data
│   └── style/         # Stylus styles
├── static/              # Static assets (served as-is)
├── package.json
└── vite.config.js
```

---

## 4. KEY RUNTIME CLASSES

### Core Boot (Game.js - 275 lines)
- Initializes Three.js scene, renderer, physics
- Manages all subsystems via events
- Ticker-driven game loop

### Physics (Physics.js)
- Uses `@dimforge/rapier3d` (not rapier3d-compat)
- Creates RAPIER.World with gravity `{x:0, y:-9.81, z:0}`
- Collision groups and categories

### Player (Player.js - 25KB)
- Vehicle controller with Rapier RigidBody
- Controls: WASD, Arrows, Shift (boost), Ctrl/B (brake), Space (jump)
- Physics-based movement with damping

### View (View.js - 31KB)
- Third-person camera follow
- Smooth lerp interpolation
- Mouse/touch camera controls

### ResourcesLoader (ResourcesLoader.js)
- GLTF loading with Draco + KTX2 support
- Audio loading via Howler

### Zones (Zones.js)
- Area triggers for content panels

### Audio (Audio.js - 24KB)
- Howler.js-based sound system
- Background music + SFX

---

## 5. STATIC ASSETS (static/)

### Models/Textures
| Folder | Files | Purpose |
|--------|-------|---------|
| `vehicle/` | default.glb, default-compressed.glb, oldSchool.glb | Car models |
| `areas/` | areas.glb, areas-compressed.glb | World map |
| `floor/` | Floor textures | Ground |
| `terrain/` | Terrain assets | Landscape |
| `trees/` (oak, birch, cherry) | Tree models | Scenery |
| `benches/`, `fences/`, `bushes/`, `flowers/` | Props | World detail |
| `project*` | Project panels | Interactive points |
| `career/`, `social/`, `achievements/` | Content zones | Info panels |

### Technical
| Folder | Files | Purpose |
|--------|-------|---------|
| `basis/` | basis_transcoder.js, .wasm | KTX2 decoding |
| `draco/` | draco_decoder.js, .wasm | Draco decoding |
| `palette.ktx` | Color palette | Rendering |
| `sounds/` | 32 subfolders | Audio files (MP3/OGG) |
| `fonts/` | Web fonts | UI typography |
| `ui/` | SVG icons, previews | Menu UI |

---

## 6. CURRENT ASSET PARITY (vs OUR REPO)

| Asset | Bruno File | Our File | Status |
|-------|---------|---------|-------|
| Car | `vehicle/default.glb` | `car.glb` | ✅ IDENTICAL |
| Map | `areas/areas.glb` | `environment.glb` | ✅ IDENTICAL |
| KTX2 | `basis/*` | `basis/*` | ✅ PRESENT |
| Draco | `draco/*` | `draco/*` | ✅ PRESENT |

---

## 7. INCOMPATIBILITIES / BLOCKERS

### Issues to Resolve
1. **Physics Library:** Bruno uses `@dimforge/rapier3d` (not -compat). Vite config requires WASM + top-level-await plugins.
2. **Three.js Version:** Bruno uses `^0.183.2` with WebGPU (`three/webgpu`), we use `0.172.0` with WebGL.
3. **Input System:** Complete custom Input system that differs from our keyboard-only approach.
4. **UI:** Complex menu/modals system with many SVG icons - would need recreation.
5. **Stylus CSS:** Bruno uses Stylus preprocessor, we use vanilla CSS/styled-components.

---

## 8. RECOMMENDED INTEGRATION STRATEGY

### Approach: Side-by-Side + Gradual Migration

**NOT recommended:** Rewrite entire codebase at once.

**RECOMMENDED:**

1. **Keep our existing R3F app** as `/src` (works standalone)

2. **Create new bundle** using Bruno structure:
   - Copy `static/` assets (already done - verified identical)
   - Create minimal entry point matching Bruno's `sources/index.js`
   - Port only: Physics, Player, View, Zones, Audio

3. **Shared assets** (no duplication):
   - Our `public/models/` = Bruno's `static/vehicle/`, `static/areas/`
   - Our `public/basis/` = Bruno's `static/basis/`
   - Our `public/draco/` = Bruno's `static/draco/`

4. **Key migration files needed:**
   - `Physics.js` → Rapier world setup
   - `Player.js` → Vehicle controller
   - `View.js` → Camera follow
   - `Zones.js` → Trigger detection

### Why This Works
- Our assets are byte-identical to Bruno's (verified)
- We keep R3F for React/Vite integration
- Bruno's mechanics can be ported component-by-component
- No breaking changes to current app

---

## 9. LEGAL NOTES

- **License:** Bruno's repo is MIT. License file included in clone.
- **Attribution:** Required in any redistributed code.
- **NOTICE:** Add THIRD_PARTY file documenting upstream origin.

---

## 10. VERIFICATION STATUS

| Item | Status |
|------|--------|
| Asset parity | ✅ VERIFIED IDENTICAL |
| Physics chunk | ✅ 2MB (rapier3d-compat) |
| Audio system | ✅ useAudio hook exists |
| Terminal UI | ✅ Overlay.jsx |
| Current app | ✅ Functional |

### What's Needed for Full Bruno Parity
- [ ] WebGPU-ready Three.js upgrade (0.183+)
- [ ] Rapier3d (not -compat) with proper WASM config
- [ ] Port Player.js input logic
- [ ] Port View.js camera logic
- [ ] Recreate menu SVG icons