<script lang="ts">
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ConvolutingMapper} from "../ConvolutingMapper.ts";
	const {
		nodeId,
		mapper,
		onSetMapperRequest,
	}: Readonly<{
		nodeId: NodeId;
		mapper: ConvolutingMapper;
		onSetMapperRequest: (mapper: ConvolutingMapper) => void;
	}> = $props();
</script>

<section>
	<table>
		<tbody>
			<tr>
				<td colspan="1" rowspan="1"></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="2" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="1"></td>
				<td colspan="3" rowspan="3" class="kernel-cell"
					><input type="number" value={mapper.kernel[0][0]} /><input
						type="radio"
						name="{nodeId}-anchor"
					/></td
				>
				<td colspan="3" rowspan="3" class="kernel-cell"
					><input type="number" value={mapper.kernel[0][1]} /><input
						type="radio"
						name="{nodeId}-anchor"
					/></td
				>
				<td colspan="1" rowspan="1"></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
				<td colspan="1" rowspan="2"></td>
				<td colspan="1" rowspan="2"></td>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
			</tr>
			<tr>
				<td colspan="3" rowspan="3" class="kernel-cell"
					><input type="number" value={mapper.kernel[1][0]} /><input
						type="radio"
						name="{nodeId}-anchor"
					/></td
				>
				<td colspan="3" rowspan="3" class="kernel-cell"
					><input type="number" value={mapper.kernel[1][1]} /><input
						type="radio"
						name="{nodeId}-anchor"
					/></td
				>
			</tr>
			<tr>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="2"><button type="button">+</button></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="2" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
				<td colspan="1" rowspan="1"></td>
			</tr>
			<tr>
				<td colspan="1" rowspan="1"></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"><button type="button">-</button></td>
				<td colspan="2" rowspan="1"><button type="button">+</button></td>
				<td colspan="1" rowspan="1"></td>
			</tr>
			<!-- {#each mapper.kernel as row}
				<tr>
					{#each row as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each} -->
		</tbody>
	</table>
</section>

<style lang="scss">
	td {
		text-align: center;
		padding: 0;
	}
	table {
		border-collapse: collapse;
		width: max-content;
		border-spacing: 0;
	}
	input {
		width: 30px;
	}
	td[colspan="1"] {
		width: calc(1 * 50px);
	}
	td[colspan="2"] {
		width: calc(2 * 50px);
	}
	td[colspan="3"] {
		width: calc(3 * 50px);
	}
	td[rowspan="1"] {
		height: calc(1 * 50px);
	}
	td[rowspan="2"] {
		height: calc(2 * 50px);
	}
	td[rowspan="3"] {
		height: calc(3 * 50px);
	}
	.kernel-cell {
		background-color: #eee;
	}
</style>
