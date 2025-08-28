export function toInt(value: unknown, min: number) {
	return Number.isInteger(Number(value)) ? Math.max(min, Number(value)) : min;
}
