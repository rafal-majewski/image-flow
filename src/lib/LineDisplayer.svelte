<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	const {
		sourcePosition,
		targetPosition,
	}: Readonly<{sourcePosition: Coordinates; targetPosition: Coordinates}> =
		$props();
	const length = $derived(
		((sourcePosition.x - targetPosition.x) ** 2
			+ (sourcePosition.y - targetPosition.y) ** 2)
			** 0.5,
	);
	const angleRadians = $derived(
		Math.atan2(
			targetPosition.y - sourcePosition.y,
			targetPosition.x - sourcePosition.x,
		),
	);
</script>

<svg
	viewBox="0 0 {length} {2}"
	width={length}
	height={2}
	xmlns="http://www.w3.org/2000/svg"
	style:rotate="{angleRadians}rad"
	style:top="{sourcePosition.y}px"
	style:left="{sourcePosition.x}px"
>
	<line x1={0} y1={1} x2={length} y2={1} stroke="black" stroke-width="2" />
</svg>

<style lang="scss">
	svg {
		position: absolute;
		transform-origin: center left;
	}
</style>
