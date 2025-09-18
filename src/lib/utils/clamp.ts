export function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(val, max));
}

export function clampRgb(val: number): number {
	return clamp(val, 0, 255);
}
