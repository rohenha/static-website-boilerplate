// Data
import website from "@data/website"
import build from "@data/build"
// Components
import Header from "@components/organisms/Header"
import Footer from "@components/organisms/Footer"

type BaseType = {
	content: string,
	seoTitle?: string,
	seoDescription?: string,
	ogTitle?: string,
	ogCover?: string,
	ogDescription?: string,
	seoIndexing?: string,
	locale?: string,
	lang?: string,
	seoMetaData?: string,
	metas?: string,
	page: any,
	eleventy: any
}

export default function Base({
	content,
	seoTitle = website.siteTitle,
	seoDescription = website.siteDescription,
	ogTitle = website.siteTitle,
	ogDescription = website.siteDescription,
	ogCover = website.ogCover,
	seoIndexing = website.seoIndexing,
	locale = website.locale,
	lang = website.lang,
	seoMetaData = '',
	metas = '',
	page,
	eleventy
}: BaseType) {
  return (
		<>
		{{ html: `<!DOCTYPE html>` }}
    <html lang={lang} class="min-h-full">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    		<meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1"/>
        <title>{seoTitle}</title>
				<meta name="description" content={seoDescription} />
				<meta name="robots" content={!build.visibility ? 'noindex, nofollow' :  seoIndexing}/>
				<meta property="og:locale" content={locale}/>
				<meta property="og:type" content="website"/>
				<meta property="og:url" content={ `${website.url}${page.url}` }/>
				<meta property="og:site_name" content={website.siteName}/>
				<meta property="og:title" content={ogTitle}/>
				<meta property="og:description" content={ogDescription}/>
				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:site" content={website.url} />
				<meta name="twitter:title" content={ogTitle}/>
				<meta name="twitter:description" content={ogDescription}/>
				{/* Image */}
				{ogCover && (<>
					<meta property="og:image" content={ogCover} />
					<meta property="og:image:secure_url" content={ogCover} />
					<meta name="twitter:image" content={ogCover} />
				</>)}
				{/* Favicon */}
				<link rel="icon" type="image/png" href="/assets/favicon/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
				<link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content={website.siteTitle} />
				<link rel="manifest" href="/assets/site.webmanifest" />
				<meta name="theme-color" content={website.themeColor} />
				{seoMetaData && <script type="application/ld+json">{seoMetaData}</script>}
				{{ html: metas }}
				<link rel="stylesheet" href="/assets/styles/index.scss" />
      </head>
      <body class="min-h-full bg-white" id="body">
				<a href="#main" class="sr-only -focusable">Aller directement au contenu</a>
				<Header page={page} />
				{{ html: content }}
				<Footer eleventy={eleventy} page={page} />
				<script src="/assets/scripts/index.ts" type="module" defer></script>
			</body>
    </html>
		</>
  );
}
