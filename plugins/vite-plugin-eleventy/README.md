# Plugin Vite-Eleventy

Ce plugin intègre automatiquement Eleventy avec Vite pour une expérience de développement optimale.

## Fonctionnalités

- 🔄 **Construction automatique** : Lance Eleventy au démarrage du serveur Vite
- 👀 **Hot Reload** : Surveille les fichiers sources et reconstruit automatiquement
- 🚀 **Serveur intégré** : Sert les pages générées par Eleventy via le serveur Vite
- ⚡ **Performance** : Évite les reconstructions inutiles pendant les builds

## Configuration

```javascript
import vitePluingEleventy from './plugins/vite-plugin-eleventy.js'

export default defineConfig({
  plugins: [
    vitePluingEleventy({
      srcDir: 'src',                    // Dossier source Eleventy
      outputDir: '_dist',               // Dossier de sortie Eleventy
      watchExtensions: [                // Extensions à surveiller
        '11ty.tsx', '11ty.jsx', '11ty.ts', 'md', 'tsx', 'jsx'
      ],
      watch: true                       // Activer le mode watch (auto en dev)
    })
  ]
})
```

## Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `srcDir` | `string` | `'src'` | Dossier source d'Eleventy |
| `outputDir` | `string` | `'_dist'` | Dossier de sortie d'Eleventy |
| `watchExtensions` | `string[]` | `['11ty.tsx', '11ty.jsx', '11ty.ts', 'md', 'tsx', 'jsx']` | Extensions de fichiers à surveiller |
| `watch` | `boolean` | `true` (en dev) | Activer la surveillance des fichiers |

## Utilisation

### Développement
```bash
npm run dev
```

Le plugin va :
1. Construire les pages Eleventy au démarrage
2. Surveiller les changements dans `src/`
3. Reconstruire automatiquement les pages modifiées
4. Recharger le navigateur

### Production
```bash
npm run build
```

Construit d'abord les pages Eleventy, puis optimise les assets avec Vite.

## Surveillance des fichiers

Le plugin surveille automatiquement :
- `src/**/*.{11ty.tsx,11ty.jsx,11ty.ts,md,tsx,jsx}`
- `src/_layouts/**/*`
- `src/_components/**/*`
- `src/_data/**/*`

## Logs

Le plugin affiche des logs colorés pour suivre l'activité :
- 🔄 Construction des pages
- ✅ Construction réussie
- ❌ Erreurs de construction
- 📝 Fichiers modifiés
- ➕ Nouveaux fichiers
- 🗑️ Fichiers supprimés
- 👀 Surveillance activée

## Intégration avec Vite

Le plugin s'intègre parfaitement avec l'écosystème Vite :
- Utilise le HMR (Hot Module Replacement) de Vite
- Respecte les modes développement/production
- Compatible avec les autres plugins Vite
- Sert les fichiers via le serveur de développement Vite
