import LandingPage from './pages/LandingPage'
import ConsentPage from './pages/ConsentPage'
import ProfilePage from './pages/ProfilePage'
import ResultsPage from './pages/ResultsPage'
import SchemeDetailPage from './pages/SchemeDetailPage'
import DraftPage from './pages/DraftPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const path = window.location.pathname

  if (path === '/consent') return <ConsentPage />
  if (path === '/profile') return <ProfilePage />
  if (path === '/results') return <ResultsPage />
  if (path === '/settings') return <SettingsPage />
  if (path.startsWith('/schemes/')) return <SchemeDetailPage id={path.split('/').pop()} />
  if (path.startsWith('/draft/')) return <DraftPage id={path.split('/').pop()} />

  return <LandingPage />
}
