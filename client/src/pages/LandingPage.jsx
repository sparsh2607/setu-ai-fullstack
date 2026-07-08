import CustomCursor from '../components/CustomCursor'
import ScrollProgress from '../components/ScrollProgress'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Pipeline from '../components/Pipeline'
import Features from '../components/Features'
import DashboardPreview from '../components/DashboardPreview'
import Trust from '../components/Trust'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'


export default function LandingPage() {
  return (
    <div className="relative">
      <div className="grain-overlay" />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Pipeline />
        <Features />
        <DashboardPreview />
        <Trust />
        <FinalCTA />

      </main>
      <Footer />
    </div>
  )
}
