import fs from 'fs'
import path from 'path'
// import config from '../config.js'
import SVGSpriter from 'svg-sprite'

try {
	const input = process.argv[2]
	const output = process.argv[3]
	var myRegexp = /^(.*\/)/g
	const outputDir = myRegexp.exec(output)
	if (!outputDir[1]) {
		throw new Error('Le chemin possède une erreur')
	}
	const setName = (id) => `icon-${id}`

	const files = fs.readdirSync(input).filter(file => file.endsWith('.svg'));

	const sprite = SVGSpriter({
		mode: {
			symbol: true,
			inline: true
		},
		svg: { // General options for created SVG files
			xmlDeclaration: false, // Add XML declaration to SVG sprite
			doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
			dimensionAttributes: false, // Width and height attributes on the sprite
			rootAttributes: {
				style: 'display:none;',
				// style: 'position:absolute; top:0; left:0; width:0; height:0;',
				'aria-hidden': 'true',
      	focusable: 'false',
				role: 'graphics-symbol',
				'aria-label': 'Icônes'
			}
		},
	});

	// Parcourez chaque fichier SVG et ajoutez-le au sprite
	files.forEach((file) => {
		const filePath = path.join(input, file);
		const svg = fs.readFileSync(filePath, 'utf8');
		const id = setName(path.parse(file).name); // Utilisez le nom de fichier comme ID
		sprite.add(id, null, svg);
	});

	sprite.compile((error, result) => {
		for (const mode of Object.values(result)) {
				for (const resource of Object.values(mode)) {
						fs.mkdirSync(outputDir[1], { recursive: true });
						fs.writeFileSync(output, resource.contents);
				}
		}
	});

	// Enregistrez le sprite dans un fichier de sortie
	// fs.writeFileSync(config.sprite.output, sprite.toString());

	console.log(`Sprite SVG généré avec succès : ${output}`);

} catch (error) {
	console.warn(error.message)
}
