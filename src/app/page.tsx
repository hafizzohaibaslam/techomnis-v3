import { Navigation } from '@/components/layout/navigation'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Works } from '@/components/sections/works'
import { Thesis } from '@/components/sections/thesis'
import { Direction } from '@/components/sections/direction'
import { Clients } from '@/components/sections/clients'
import { Reviews } from '@/components/sections/reviews'
import { WhyUs } from '@/components/sections/why-us'
import { Footer } from '@/components/sections/footer'

export default function Home() {

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page" id="page">
        <main id="main">
          <Hero />
          <Services />
          <Works />
          <Thesis />
          <Direction />
          <Clients />
          <div className="wrap">
            <Reviews />
          </div>
          <WhyUs />
        </main>
        <Footer />
      </div>
      <Navigation />
    </>
  )
}
