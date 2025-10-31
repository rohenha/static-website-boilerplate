// /* ──────────────────────────────────────────────────────────
// ►►► Post CSS Config
// ────────────────────────────────────────────────────────── */

import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import sortmedias from 'postcss-sort-media-queries'
import combinemedias from 'postcss-combine-media-query'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    sortmedias({
      sort: 'mobile-first',
    }),
    combinemedias(),
  ],
}
