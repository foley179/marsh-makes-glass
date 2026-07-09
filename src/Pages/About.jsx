import './About.css'
import Title from '../Components/Title'

function About() {
  return (
    <>
      <Title text="About" />
      <section className="page-body">
        <h1 className="about-title">The Depths We Work In</h1>

        <p className="about-text">
          Marsh Makes Glass is a one-woman studio where stained glass meets the
          strange and the submerged. Every piece is cut, leaded, and soldered
          by hand — jellyfish drifting through gothic arches, anglerfish lit
          from within, kelp forests rendered in cathedral color.
        </p>

        <p className="about-text">
          There's no factory here, no molds. Just glass, lead came, flux, and
          a lot of patience. If a piece has a wobble in the line or a bubble
          in the solder, that's not a flaw — that's a hand having made it.
        </p>

        <p className="about-signature">— Marsh</p>
      </section>
    </>
  )
}

export default About