# THIRD-PARTY NOTICES

This project includes components derived from Bruno Simon's folio-2025.

---

## Upstream Origin

**Project:** brunosimon/folio-2025  
**Repository:** https://github.com/brunosimon/folio-2025  
**License:** MIT License  
**Author:** Bruno Simon

---

## Reused Components

The following static assets were copied from the upstream repository:

1. **3D Models**
   - `static/vehicle/default.glb` → `public/models/car.glb`
   - `static/areas/areas.glb` → `public/models/environment.glb`

2. **Technical Assets**
   - `static/basis/` (KTX2 transcoder) → `public/basis/`
   - `static/draco/` (Draco decoder) → `public/draco/`

All asset files are byte-identical to the upstream originals.

---

## Architecture Reference

The interactive 3D experience structure was inspired by:
- Rapier physics integration
- Third-person camera follow system
- Zone-based trigger detection
- Vehicle controller mechanics

---

## License Notice

This project is not affiliated with or endorsed by Bruno Simon.

The MIT License from the original repository applies to the reused portions. 
See: https://github.com/brunosimon/folio-2025/blob/main/license.md

---

## Local Reference

A local clone of the upstream repository was used for inspection and verification during development.
This clone is maintained separately and is NOT included in this repository's history.