import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from './init'

import {
  evolutionLeaderboard,
  fusionLeaderboard,
  risingLeaderboard,
} from '#/data/leaderboard-data'

import type { TRPCRouterRecord } from '@trpc/server'

// ─── Existing todos (kept for demo reference) ────────────────────────

const todos = [
  { id: 1, name: 'Get groceries' },
  { id: 2, name: 'Buy a new phone' },
  { id: 3, name: 'Finish the project' },
]

const todosRouter = {
  list: publicProcedure.query(() => todos),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const newTodo = { id: todos.length + 1, name: input.name }
      todos.push(newTodo)
      return newTodo
    }),
} satisfies TRPCRouterRecord

// ─── Leaderboard routes ──────────────────────────────────────────────

const FUSION_PAGE_SIZE = 10

const leaderboardRouter = {
  evolution: publicProcedure
    .input(
      z.object({
        cursor: z.number().min(0).default(0),
        limit: z.number().min(1).max(100).default(30),
      }),
    )
    .query(({ input }) => {
      const { cursor, limit } = input
      const items = evolutionLeaderboard.slice(cursor, cursor + limit)
      const nextCursor = cursor + limit < evolutionLeaderboard.length ? cursor + limit : null
      return {
        items,
        nextCursor,
        totalRiders: evolutionLeaderboard.length,
      }
    }),

  fusion: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(50).default(FUSION_PAGE_SIZE),
      }),
    )
    .query(({ input }) => {
      const { page, pageSize } = input
      const start = (page - 1) * pageSize
      const items = fusionLeaderboard.slice(start, start + pageSize)
      const totalPages = Math.ceil(fusionLeaderboard.length / pageSize)
      return {
        items,
        page,
        totalPages,
        totalRiders: fusionLeaderboard.length,
      }
    }),

  rising: publicProcedure
    .input(
      z.object({
        cursor: z.number().min(0).default(0),
        limit: z.number().min(1).max(100).default(30),
      }),
    )
    .query(({ input }) => {
      const { cursor, limit } = input
      const items = risingLeaderboard.slice(cursor, cursor + limit)
      const nextCursor = cursor + limit < risingLeaderboard.length ? cursor + limit : null
      return {
        items,
        nextCursor,
        totalRiders: risingLeaderboard.length,
      }
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
  leaderboard: leaderboardRouter,
})
export type TRPCRouter = typeof trpcRouter
