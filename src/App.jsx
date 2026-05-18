import SExperience from './SExperience';

// ============================================================
// App — Renders the full S experience.
//
// SExperience internally mounts <Portfolio /> as its base
// layer and overlays the S flow (curtain → chat → flash) on top.
// When the visitor exits S, the overlays disappear and the
// portfolio (which was mounted the whole time) is fully visible.
//
// No state swap needed at this level — SExperience handles
// everything internally for a flicker-free transition.
// ============================================================
export default function App() {
  return <SExperience />;
}