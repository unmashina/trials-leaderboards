import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTRPC } from '#/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/fusion')({ component: FusionPage })

const PAGE_SIZE = 10

function FusionPage() {
  const trpc = useTRPC()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery(
    trpc.leaderboard.fusion.queryOptions({ page, pageSize: PAGE_SIZE }),
  )

  const items = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const totalRiders = data?.totalRiders ?? 0

  return (
    <div className="fusion-page">
      <div className="fusion-container">
        <div className="fusion-title">{m.fusion_title()}</div>

        <div className="fusion-header">
          <span className="fusion-header--rank">{m.fusion_rank()}</span>
          <span />
          <span />
          <span className="fusion-header--name">{m.fusion_name_header()}</span>
          <span className="fusion-header--medal">{m.fusion_medal()}</span>
          <span className="fusion-header--faults">{m.fusion_faults()}</span>
          <span className="fusion-header--time">{m.fusion_time()}</span>
        </div>

        <div className="fusion-body">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.5rem' }}>
              Loading...
            </div>
          ) : (
            items.map((entry, i) => (
              <div className="fusion-row" key={`${entry.name}-${i}`}>
                <span className="fusion-row--rank">{entry.rank}</span>
                <div className="fusion-row--club">
                  {entry.club && (
                    <img
                      src={`/trials/fusion/clubs/${entry.club}.png`}
                      alt={entry.club}
                    />
                  )}
                </div>
                <div className="fusion-row--flag">
                  <img
                    src={`/trials/fusion/flags/${entry.flag}.svg`}
                    alt={entry.flag}
                  />
                </div>
                <span className="fusion-row--name">{entry.name}</span>
                <div className="fusion-row--medal">
                  <img
                    src={`/trials/fusion/medals/${entry.medal}_medal.png`}
                    alt={entry.medal}
                  />
                </div>
                <span className="fusion-row--faults">{entry.faults}</span>
                <span className="fusion-row--time">{entry.time}</span>
              </div>
            ))
          )}
        </div>

        <div className="fusion-footer">
          <span>{m.common_total_riders()} {totalRiders}</span>

          <div>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{ marginRight: '20px' }}
            >
              &#9664;
            </button>
            {m.fusion_page({ current: String(page), total: String(totalPages) })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{ marginLeft: '20px' }}
            >
              &#9654;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
