import { importPalette } from '$lib/render/import-palette';
import type { RgbColor } from '$lib/types';

export const rgbPalette: RgbColor[] = [
	[255, 0, 0],
	[0, 255, 0],
	[0, 0, 255]
];

export const cmykPalette: RgbColor[] = [
	[0, 255, 255],
	[255, 0, 255],
	[255, 255, 0],
	[0, 0, 0]
];

export const pico8: RgbColor[] = importPalette(`
000000
1d2b53
7e2553
008751
ab5236
5f574f
c2c3c7
fff1e8
ff004d
ffa300
ffec27
00e436
29adff
83769c
ff77a8
ffccaa
`);

export const wplaceFree: RgbColor[] = importPalette(`
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
`);

export const wplaceFull: RgbColor[] = importPalette(`
000000
3c3c3c
787878
aaaaaa
d2d2d2
ffffff
600018
a50e1e
ed1c24
fa8072
e45c1a
ff7f27
f6aa09
f9dd3b
fffabc
9c8431
c5ad31
e8d45f
4a6b3a
5a944a
84c573
0eb968
13e67b
87ff5e
0c816e
10aea6
13e1be
0f799f
60f7f2
bbfaf2
28509e
4093e4
7dc7ff
4d31b8
6b50f6
99b1fb
4a4284
7a71c4
b5aef1
780c99
aa38b9
e09ff9
cb007a
ec1f80
f38da9
9b5249
d18078
fab6a4
684634
95682a
dba463
7b6352
9c846b
d6b594
d18051
f8b277
ffc5a5
6d643f
948c6b
cdc59e
333941
6d758d
b3b9d1
`);
