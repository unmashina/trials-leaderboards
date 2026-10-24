import { createFileRoute, Link } from '@tanstack/react-router'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/')({ component: GameSelector })

function GameSelector() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">{m.common_leaderboards()}</p>
        <h1 className="display-title mb-5 text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          {m.game_selector_title()}
        </h1>
        <p className="mb-8 text-base text-[var(--sea-ink-soft)] sm:text-lg">
          {m.game_selector_subtitle()}
        </p>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-3">
        <GameCard
          to="/evolution"
          title={m.evolution_name()}
          bg="#614e32"
          accent="#ffac04"
          description="2012"
          delay={0}
        />
        <GameCard
          to="/fusion"
          title={m.fusion_name()}
          bg="#1c2c3d"
          accent="#00c3ff"
          description="2014"
          delay={90}
        />
        <GameCard
          to="/rising"
          title={m.rising_name()}
          bg="#1a1a2e"
          accent="#2cffb9"
          description="2019"
          delay={180}
        />
      </section>
    </main>
  )
}

function GameCard({
  to,
  title,
  bg,
  accent,
  description,
  delay,
}: {
  to: string
  title: string
  bg: string
  accent: string
  description: string
  delay: number
}) {
  return (
    <Link
      to={to}
      className="rise-in group relative block overflow-hidden rounded-2xl border border-[var(--line)] p-6 no-underline transition-all hover:-translate-y-1"
      style={{
        animationDelay: `${delay + 80}ms`,
        background: `linear-gradient(165deg, ${bg}dd, ${bg})`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 66%)` }}
      />
      <p
        className="mb-1 text-xs font-bold uppercase tracking-[0.2em] opacity-60"
        style={{ color: accent }}
      >
        {description}
      </p>
      <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
        style={{ color: accent }}
      >
        {m.common_leaderboards()} →
      </span>
    </Link>
  )
}
