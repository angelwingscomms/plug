// import { writeFileSync } from "fs";

const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z'
];

const alphabet_mapping = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	k: 11,
	l: 12,
	m: 13,
	n: 14,
	o: 15,
	p: 16,
	q: 17,
	r: 18,
	s: 19,
	t: 20,
	u: 21,
	v: 22,
	w: 23,
	x: 24,
	y: 25,
	z: 26
};
alphabet.forEach((a, i) => {
	alphabet_mapping[a] = i + 1;
});

const word = (process.argv[2] || '').toLowerCase()
let sum = 0;
let product = 1;
for (let a of word) {
	sum += alphabet_mapping[a] ? alphabet_mapping[a] : isNaN(+a) ? 0 : +a;
    product *= alphabet_mapping[a] ? alphabet_mapping[a] : isNaN(+a) ? 1 : +a
}
let product_sum = 0
for (let a of product.toString()) {
    product_sum += Number(a)
}
console.log(`"${word}":`, 'sum:', sum, 'product:', product, 'product-sum:', product_sum);
// writeFileSync('a', `${sum} ${product} ${product_sum}`)