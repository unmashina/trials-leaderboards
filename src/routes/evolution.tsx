import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import { useTRPC } from '#/integrations/trpc/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/evolution')({ component: EvolutionPage })

function EvolutionPage() {
  const trpc = useTRPC()
  const bodyRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.leaderboard.evolution.infiniteQueryOptions(
        { limit: 30 },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
          initialCursor: 0,
        },
      ),
    )

  const allItems = data?.pages.flatMap((p) => p.items) ?? []
  const totalRiders = data?.pages[0]?.totalRiders ?? 0

  // Infinite scroll observer
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = bodyRef.current
    if (!el || !hasNextPage || isFetchingNextPage) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight - scrollTop - clientHeight < 200) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="evo-page">
      <div className="evo-container">
        <div className="evo-header">
          <span className="evo-header--rank" data-content={m.common_rank()}>
            {m.common_rank()}
          </span>
          <span />
          <span data-content={m.evolution_user()}>{m.evolution_user()}</span>
          <span data-content={m.common_faults()}>{m.common_faults()}</span>
          <span data-content={m.common_time()}>{m.common_time()}</span>
        </div>

        <div className="evo-body" ref={bodyRef}>
          {allItems.map((entry, i) => (
            <div className="evo-row" key={`${entry.name}-${i}`}>
              <span className="evo-row--rank" data-content={String(entry.rank)}>
                {entry.rank}
              </span>
              <span className="evo-row--flag">
                <img
                  src={`/trials/evolution/flags/${entry.flag}.png`}
                  alt={entry.flag}
                />
              </span>
              <span
                className={`evo-row--name${entry.role ? ' role' : ''}`}
                data-content={entry.name}
              >
                {entry.name}
              </span>
              <span data-content={String(entry.faults)}>
                {entry.faults}
              </span>
              <span data-content={entry.time}>{entry.time}</span>
            </div>
          ))}
          {isFetchingNextPage && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#ffac04' }}>
              Loading...
            </div>
          )}
          <div ref={sentinelRef} />
        </div>

        <div className="evo-footer">
          {m.common_total_riders()} {totalRiders}
        </div>

      </div>
    </div>
  )
}
