// Backwards-compatible re-exports for previous imports that referenced
// `src/context/AuthContext.jsx`. Internally we split the implementation into
// smaller files so component files no longer export non-component helpers —
// this helps Fast Refresh and keeps linter/refresh warnings away.
// Backwards-compatible re-export: only export components from this file so
// Fast Refresh doesn't complain. Consumers should import the hook from
// `src/hooks/useAuth` directly.
export { AuthProvider } from './AuthProvider'

