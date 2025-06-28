<script lang="ts">
	import Board from "../lib/Board.svelte";
	import {Coordinates} from "../lib/coordinates/Coordinates.ts";
	import Menu from "../lib/menu/Menu.svelte";
	import type {Node} from "../lib/node/Node.svelte.ts";
	import {NodeState} from "../lib/node/state/NodeState.ts";
	let cameraPosition = $state<Coordinates>(new Coordinates(0, 0));
	function handleAddNodeRequest(nodeToAdd: Node<NodeState>): void {
		nodes = [...nodes, nodeToAdd];
	}
	let nodes = $state.raw<readonly Node<NodeState>[]>([]);
	function handleDeleteNodeRequest(nodeToDelete: Node<NodeState>): void {
		nodes = nodes.filter((node) => {
			return node.id !== nodeToDelete.id;
		});
	}
	function handleSetCameraPositionRequest(
		newCameraPosition: Coordinates,
	): void {
		cameraPosition = newCameraPosition;
	}
</script>

<main>
	<Board
		{nodes}
		onDeleteNodeRequest={handleDeleteNodeRequest}
		{cameraPosition}
		onSetCameraPositionRequest={handleSetCameraPositionRequest}
	/>
	<Menu onAddNodeRequest={handleAddNodeRequest} {cameraPosition} />
</main>

<style lang="scss">
	main {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
	}
</style>
