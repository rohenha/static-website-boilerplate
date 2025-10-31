export default {
	env: process.env.ELEVENTY_RUN_MODE,
	timestamp: new Date(),
	visibility: process.env.ELEVENTY_VISIBILITY === 'true',
}

