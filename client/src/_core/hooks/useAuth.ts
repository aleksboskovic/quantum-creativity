// Placeholder — auth is not used on this public site.
// Keep for future use if a dashboard or admin area is added.
export function useAuth() {
  return {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };
}
