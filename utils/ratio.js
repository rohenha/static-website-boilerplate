#!/usr/bin/env node

// Fonction de calcul du PGCD
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// Récupération des arguments
const width = parseInt(process.argv[2]);
const height = parseInt(process.argv[3]);

// Vérification des arguments
if (isNaN(width) || isNaN(height)) {
    console.error('Utilisez : node script.js <largeur> <hauteur>');
    process.exit(1);
}

// Calcul du ratio simplifié
const divisor = gcd(width, height);
const simplifiedWidth = width / divisor;
const simplifiedHeight = height / divisor;

console.log(`Ratio original: ${width}/${height}`);
console.log(`Ratio simplifié: ${simplifiedWidth}/${simplifiedHeight}`);
