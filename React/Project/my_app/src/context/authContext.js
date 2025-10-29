import { createContext } from 'react'

// Shared context object for Auth. Kept small so it can be imported by both
// the Provider and the hook implementation without exporting non-component
// values from component files (helps Fast Refresh).
export const AuthContext = createContext(null)

// Export AuthProvider here as well so imports that resolve to this file
// (case-insensitive file systems / Vite resolution) still receive the
// provider. This avoids "does not provide an export named 'AuthProvider'"
// runtime errors when the bundler picks this module during resolution.
export { AuthProvider } from './AuthProvider'
