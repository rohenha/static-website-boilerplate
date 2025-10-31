import type { ViteDevServer, UserConfig as ViteConfig } from "vite";

export type VitePluginEleventyOptions = {
	isProd: boolean;
	outputDir?: string;
	eleventyDir?: string;
	srcDir?: string;
	assetsDir?: string;
	eleventyArgs?: string[];
}

export type runEleventyServerOptions = {
	eleventyArgs?: string[];
}

export type watcherOptions = {
	watchDir?: string;
	server: ViteDevServer;
}

export type configureHtmlInputsOptions = {
	config: ViteConfig;
	eleventyDir: string;
	assetsDir: string;
}
