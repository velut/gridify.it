import hexRgb from 'hex-rgb';

const palette = `
000000
3c3c3c
787878
d2d2d2
ffffff
600018
ed1c24
ff7f27
f6aa09
f9dd3b
fffabc
0eb968
13e67b
87ff5e
0c816e
10aea6
13e1be
28509e
4093e4
60f7f2
6b50f6
99b1fb
780c99
aa38b9
e09ff9
cb007a
ec1f80
f38da9
684634
95682a
f8b277
`;

await Bun.write('palette.txt', importPalette(palette));

function importPalette(palette: string): string {
	return palette
		.trim()
		.split('\n')
		.map((line) => {
			const [r, g, b] = hexRgb(line.trim(), { format: 'array' });
			return `[${r}, ${g}, ${b}],`;
		})
		.join('\n');
}
