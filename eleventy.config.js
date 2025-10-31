// Dependencies
import "tsx/esm";
import { jsxToString } from "jsx-async-runtime"
import dotenv from 'dotenv'

// Config
import { config as projectConfig } from './config.js'

dotenv.config()

export default async function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('base', 'base.11ty.tsx')

  // Add TypeScript support for data files
  eleventyConfig.addDataExtension("ts", async (contents, filePath) => {
    const module = await import(filePath);
    return module.default;
  });

	eleventyConfig.addCollection("blogItems", function(collectionApi) {
    return collectionApi.getFilteredByTag("blogItems").sort((a, b) => {
      return b.date - a.date;
    })
  })

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				const content = await this.defaultRenderer(data)
        const result = await jsxToString(content)
        return result
			};
		},
	})
	eleventyConfig.addWatchTarget("./src/_components")
}

export const config = {
	templateFormats: ["11ty.jsx", "11ty.ts", "11ty.tsx", 'md'],
  dir: {
		input: 'src', // default: "."
		includes: '_includes', // default: "_includes" (`input` relative)
    layouts: '_layouts', // default: same as `includes` (`input` relative)
		data: '_data', // default: "_data" (`input` relative)
		output: projectConfig.eleventyDir, // default: "_site"
	},
}
