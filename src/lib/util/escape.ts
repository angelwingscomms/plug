const replacements: { [i: string]: string } = {
	',': '\\,',
	'.': '\\.',
	'<': '\\<',
	'>': '\\>',
	'{': '\\{',
	'}': '\\}',
	'[': '\\[',
	']': '\\]',
	'"': '\\"',
	"'": "\\'",
	':': '\\:',
	';': '\\;',
	'!': '\\!',
	'@': '\\@',
	'#': '\\#',
	$: '\\$',
	'%': '\\%',
	'^': '\\^',
	'&': '\\&',
	'*': '\\*',
	'(': '\\(',
	')': '\\)',
	'-': '\\-',
	'+': '\\+',
	'=': '\\=',
	'~': '\\~'
};

export const escape = (input: string) => {
	let res = input;
	for (const k of Object.keys(replacements)) {
		res = res.replace(k, replacements[k]);
	}
	return res;
};
// export const escape = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
