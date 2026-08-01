# LYY Inspector App (mobile) — client review build

Expo (React Native + TypeScript) Android tablet app for LYY inspectors. **This build is UI-only**: all seven inspection modules from [`docs/IMPLEMENTATION_PLAN.md`](../docs/IMPLEMENTATION_PLAN.md) — Daily Check, Spot Check, Fabric Inspection, Factory Check, Inline Inspection, Final Inspection, PP Meeting — are implemented as screens, and every one of them runs on static/mock data. There is no backend, no database, and no network dependency.

## Setup

```bash
cd tablet-app/app
npm install
npx expo install --fix   # aligns dependency versions with your installed Expo SDK
npm start                 # then press 'a' for Android (emulator or device), or 'w' for web
```

No backend to start, no `.env` to configure — the app is fully self-contained.

## Try it

1. Sign in with **any email and password** (nothing is validated).
2. Set a 4-digit MPIN when prompted — this is a real device-local pairing (stored via `AsyncStorage`), so signing out and back in with the same email shows the MPIN screen instead of the password form again, matching the original flow.
3. Dashboard → **New Inspection** → pick any of the seven modules → fill in the sections (left rail to jump between them) → **Save Draft** or **Submit**. Created/edited inspections live in memory for the rest of the session and show up in that module's list, the Dashboard, and Reports.
4. Try the Fabric Inspection Roll-by-Roll (§4) and Defect Log (§5) sections together: add a roll, add a defect row referencing that Roll #, and watch Total Pts / Pts-per-100yd² / the summary tiles in §6 recompute automatically.

## Folder structure

```
app/
├─ App.tsx                          # GestureHandler → SafeArea → PaperProvider → AuthProvider → RootNavigator
├─ src/
│  ├─ api/                          # mock data layer — same function signatures a real backend would have,
│  │                                 # but every call resolves against static/in-memory data, no network I/O
│  ├─ auth/                         # AuthProvider (session bootstrap) + useAuthStore (zustand) — mock login accepts anything
│  ├─ navigation/                   # RootNavigator (auth switch), AppDrawer, one Stack per module
│  ├─ screens/
│  │  ├─ auth/                      # LoginScreen, CreateMpinScreen, MpinLoginScreen, SignUpScreen
│  │  ├─ dashboard/, reports/, notifications/, settings/
│  │  └─ <module>/                  # ListScreen + FormScreen + sections/ (one component per template section)
│  ├─ features/<module>/            # domain logic — no UI: types, empty-form factories, mockInspections.ts, autoCalc formulas
│  ├─ components/                   # shared UI: AppHeader, ModuleCard, StatusChip, EmptyState, SectionProgressRail
│  │  └─ form/                      # reusable field components: Text/Number/Date/Dropdown/Radio/TextArea/
│  │                                 # CheckGrid/RepeatableTable/PhotoSlot/FileUploadRow/SignaturePad
│  ├─ constants/modules.ts          # the 7-module registry driving drawer/dashboard
│  └─ theme/paperTheme.ts           # MD3 theme, colors matched to mockups/inspector-app-mockup.html
```

## What's simplified vs. the full plan (by design)

`docs/IMPLEMENTATION_PLAN.md` originally specified a full end-to-end app: a real backend, WatermelonDB as an offline-first local database with a background Sync Engine, and a generic JSON-`FormSchema`-driven form renderer. None of that is present in this build:

- **No backend.** `src/api/*.ts` are mock modules — same exported functions a real API client would have, but they resolve against static arrays and an in-memory store instead of making HTTP calls.
- **Every module is hand-built, not schema-driven.** The reusable field components (`components/form/`) are composed directly per each template's known sections rather than interpreting a schema at runtime.
- **No offline DB / sync engine.** "Save Draft" and "Submit" just update the in-memory mock store for the current session.

This is intentional for a client-facing UI/UX review build — see the root [`README.md`](../README.md) for what's in and out of scope.
