import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import { useTRPC } from '#/integrations/trpc/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/rising')({ component: RisingPage })

function RisingPage() {
  const trpc = useTRPC()
  const bodyRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.leaderboard.rising.infiniteQueryOptions(
        { limit: 30 },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
          initialCursor: 0,
        },
      ),
    )

  const allItems = data?.pages.flatMap((p) => p.items) ?? []
  const totalRiders = data?.pages[0]?.totalRiders ?? 0

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

  const now = new Date()
  const day = now.getDate()
  const month = now.toLocaleString('en', { month: 'short' }).toUpperCase()
  const year = now.getFullYear()
  const time = now.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div className="rising-page">
      <div className="rising-container">
        <div className="rising-header">
          <div />

          <div>{m.common_rank()}</div>
          <div className="rising-header--blank" />
          <div className="rising-header--name">{m.common_name()}</div>
          <div>{m.rising_bike()}</div>
          <div>{m.common_faults()}</div>
          <div>{m.rising_score()}</div>
          <div>{m.rising_medal()}</div>
          <div>{m.common_time()}</div>
        </div>

        <div className="rising-body" ref={bodyRef}>
          {allItems.map((entry, i) => (
            <div className="rising-row" key={`${entry.name}-${i}`}>
              <div className="rising-row--flag">
                <img
                  src={`/trials/fusion/flags/${entry.flag === 'uk' ? 'gb' : entry.flag}.svg`}
                  alt={entry.flag}
                />
              </div>
              <div>{entry.rank}</div>
              <div className="rising-row--platform">
                {entry.platform && (
                  <img
                    src={`/trials/evolution/badge/ubisoft.png`}
                    alt="ubisoft"
                  />
                )}
              </div>
              <div className="rising-row--name">{entry.name}</div>
              <div>{entry.bike}</div>
              <div>{entry.faults}</div>
              <div>{entry.score}</div>
              <div className="rising-row--medal">
                <img src="/trials/rising/diamond.png" alt={entry.medal} />
              </div>
              <div>{entry.time}</div>
            </div>
          ))}
          {isFetchingNextPage && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#2cffb9' }}>
              Loading...
            </div>
          )}
        </div>

        <div className="rising-footer">
          <div className="rising-footer--total">
            {m.common_total_riders()}&nbsp;
            <span className="rising-number">{totalRiders}</span>
          </div>
          <div className="rising-footer--date">
            {m.common_recorded()}&nbsp;
            {day}&nbsp;
            <span className="rising-date">{month}</span>&nbsp;
            {year}&nbsp;
            <span className="rising-date">{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
