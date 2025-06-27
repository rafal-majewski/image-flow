export function sanitizeDiscreteRgbColor(
	color: DiscreteRgbColor,
): DiscreteRgbColor {
	return {
		red: Math.max(0, Math.min(color.red, 255)),
		green: Math.max(0, Math.min(color.green, 255)),
		blue: Math.max(0, Math.min(color.blue, 255)),
	};
}
