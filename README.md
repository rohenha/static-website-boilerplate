<p align="center"><img src="https://www.11ty.dev/img/logo-github.svg" width="200" height="200" alt="11ty Logo">&#160;&#160;<img src="https://v1.image.11ty.dev/https%3A%2F%2Fvitejs.dev%2Flogo.svg/png/200x200/" alt="Vite logo" width="200" height="200"></p>

# Eleventy ViteJS Boilerplate 🕚⚡️🎈🐀

A boilerplate to use Eleventy with Vite JS with performance

This boilerplate:
- Uses Eleventy to transform HTML
- Uses ViteJS to transform assets
- Uses JSX as template engine
- Tailwind for CSS
- Uses Typescript for typing code
- Inline Critical CSS for Performances
- Lazyload CSS
- PostCSS to optimize CSS
- Blog pagination
- Sprite system for icons
- Brotli compression
- Build js analyzer

## Installation

```bash
# Copy .env file
cp .env.example .env

# Installation
npm install
```

Edit ***config.js*** file
```tree
|
|_ srcDir # src directory for eleventy
|_ eleventyDir # output directory for eleventy
|_ buildDir # Build directory final
|_ assetsDir # Assets directory
```
## Usage


```bash
# Development
npm run dev
```

```bash
# Build
npm run build
```

## Todo
- [ ] Export plugins as npm plugins
- [ ] Add Lazyload images

## Sources
- [Eleventy](https://www.11ty.dev/)
- [ViteJs](https://vite.dev/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
