#!/usr/bin/env -S deno run -A --unstable-hmr

import {render} from 'https://deno.land/x/resvg_wasm/mod.ts'
import {qrcode} from 'jsr:@libs/qrcode'
import {zValidator} from 'npm:@hono/zod-validator'
import {Hono} from 'npm:hono'
import {cors} from 'npm:hono/cors'
import {z} from 'npm:zod'

const app = new Hono()

app.use(cors())

app.get('/', (c) => c.redirect('https://github.com/maks11060/qr'))

app.get(
  '/svg',
  zValidator(
    'query',
    z.object({
      text: z.string().max(7089),
      s: z.coerce.number().nonnegative().min(29).max(5_000).optional(),
      b: z.coerce.number().nonnegative().min(1).max(100).default(4),
      ecl: z.enum(['LOW', 'MEDIUM', 'QUARTILE', 'HIGH']).default('LOW'),
    })
  ),
  (c) => {
    const {text, s, b, ecl} = c.req.valid('query')
    const svg = qrcode(text, {output: 'svg', border: b, ecl}).replace(
      '<svg',
      `<svg width="${s}px" height="${s}px"`
    )

    return new Response(svg, {
      headers: {'content-type': 'image/svg+xml'},
    })
  }
)

app.get(
  '/png',
  zValidator(
    'query',
    z.object({
      text: z.string().max(7089),
      s: z.coerce.number().nonnegative().min(29).max(5_000).default(300),
      b: z.coerce.number().nonnegative().min(1).max(100).default(4),
      ecl: z.enum(['LOW', 'MEDIUM', 'QUARTILE', 'HIGH']).default('LOW'),
      // light: z.string().optional(),
      // dark: z.string().optional(),
    })
  ),
  async (c) => {
    const {text, s, b, ecl} = c.req.valid('query')

    const svq = qrcode(text, {output: 'svg', border: b, ecl}).replace(
      '<svg',
      `<svg width="${s}px" height="${s}px"`
    )
    const png = await render(svq)
    return new Response(png, {
      headers: {'content-type': 'image/png'},
    })
  }
)

Deno.serve(app.fetch)
