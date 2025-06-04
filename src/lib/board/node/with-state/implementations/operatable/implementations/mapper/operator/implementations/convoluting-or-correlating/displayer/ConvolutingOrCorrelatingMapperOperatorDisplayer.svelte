<script lang="ts">
	import type {OperatableNodeId} from "../../../../../../../../../id/OperatableNodeId.ts";
	import type {ConvolutingOrCorrelatingMapperOperator} from "../ConvolutingOrCorrelatingMapperOperator.ts";
	const {
		nodeId,
		operator,
		onSetOperatorRequest,
	}: Readonly<{
		nodeId: OperatableNodeId;
		operator: ConvolutingOrCorrelatingMapperOperator;
		onSetOperatorRequest: (
			operator: ConvolutingOrCorrelatingMapperOperator,
		) => void;
	}> = $props();
	function handleAddRowRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewAnchorPointAndNewKernel(
				{
					x: operator.anchorPoint.x,
					y:
						operator.anchorPoint.y + (number_ > operator.anchorPoint.y ? 0 : 1),
				},
				[
					...operator.kernel.slice(0, number_),
					operator.kernel[0].map(() => {
						return 0;
					}),
					...operator.kernel.slice(number_, operator.kernel.length),
				] as unknown as readonly [
					readonly [number, ...(readonly number[])],
					...(readonly [number, ...(readonly number[])])[],
				],
			),
		);
	}
	function handleAddColumnRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewAnchorPointAndNewKernel(
				{
					x:
						operator.anchorPoint.x + (number_ > operator.anchorPoint.x ? 0 : 1),
					y: operator.anchorPoint.y,
				},
				operator.kernel.map((row) => {
					return [
						...row.slice(0, number_),
						0,
						...row.slice(number_, row.length),
					];
				}) as unknown as readonly [
					readonly [number, ...(readonly number[])],
					...(readonly [number, ...(readonly number[])])[],
				],
			),
		);
	}
	function handleRemoveRowRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewAnchorPointAndNewKernel(
				{
					x: operator.anchorPoint.x,
					y:
						operator.anchorPoint.y - (number_ > operator.anchorPoint.y ? 0 : 1),
				},
				[
					...operator.kernel.slice(0, number_),
					...operator.kernel.slice(number_ + 1, operator.kernel.length),
				] as unknown as readonly [
					readonly [number, ...(readonly number[])],
					...(readonly [number, ...(readonly number[])])[],
				],
			),
		);
	}
	function handleRemoveColumnRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewAnchorPointAndNewKernel(
				{
					x:
						operator.anchorPoint.x - (number_ > operator.anchorPoint.x ? 0 : 1),
					y: operator.anchorPoint.y,
				},
				operator.kernel.map((row) => {
					return [
						...row.slice(0, number_),
						...row.slice(number_ + 1, row.length),
					];
				}) as unknown as readonly [
					readonly [number, ...(readonly number[])],
					...(readonly [number, ...(readonly number[])])[],
				],
			),
		);
	}
	$inspect(operator.anchorPoint);
</script>

<section>
	<fieldset>
		<legend>Kernel</legend>
		<table>
			<tbody>
				<tr>
					<td colspan="2" rowspan="2"></td>
					<td colspan="2" rowspan="2">
						<button
							type="button"
							onclick={() => {
								handleAddColumnRequest(0);
							}}
						>
							+
						</button>
					</td>
					{#each operator.kernel[0] as cell, index (index)}
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel[0].length === 1}
								onclick={() => {
									handleRemoveColumnRequest(index);
								}}
							>
								-
							</button>
						</td>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								onclick={() => {
									handleAddColumnRequest(index + 1);
								}}
							>
								+
							</button>
						</td>
					{/each}
					<td colspan="2" rowspan="2"></td>
				</tr>
				<tr></tr>
				<tr>
					<td colspan="2" rowspan="2">
						<button
							type="button"
							onclick={() => {
								handleAddRowRequest(0);
							}}
						>
							+
						</button>
					</td>
					{#each operator.kernel[0] as cell, columnIndex (columnIndex)}
						{#if columnIndex === 0}
							<td colspan="1" rowspan="1"></td>
							<td colspan="1" rowspan="1"></td>
						{:else}
							<td colspan="2" rowspan="1"></td>
						{/if}
						<td colspan="2" rowspan="1"></td>
					{/each}
					<td colspan="1" rowspan="1"></td>
					<td colspan="1" rowspan="1"></td>
					<td colspan="2" rowspan="2">
						<button
							type="button"
							onclick={() => {
								handleAddRowRequest(0);
							}}
						>
							+
						</button>
					</td>
				</tr>
				{#each operator.kernel as row, rowIndex (rowIndex)}
					<tr>
						{#if rowIndex === 0}
							<td colspan="1" rowspan="1"></td>
						{/if}
						{#each row as cell, columnIndex (columnIndex)}
							<td colspan="4" rowspan="4" class="kernel-cell">
								<input type="number" value={cell} />
								<input
									type="radio"
									name="{nodeId}-anchor"
									checked={operator.anchorPoint.x === columnIndex
										&& operator.anchorPoint.y === rowIndex}
								/>
							</td>
						{/each}
						{#if rowIndex === 0}
							<td colspan="1" rowspan="1"></td>
						{/if}
					</tr>
					<tr>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel.length === 1}
								onclick={() => {
									handleRemoveRowRequest(rowIndex);
								}}
							>
								-
							</button>
						</td>
						<td colspan="1" rowspan="2"></td>
						<td colspan="1" rowspan="2"></td>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel.length === 1}
								onclick={() => {
									handleRemoveRowRequest(rowIndex);
								}}
							>
								-
							</button>
						</td>
					</tr>
					<tr></tr>
					<tr>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								onclick={() => {
									handleAddRowRequest(rowIndex + 1);
								}}
							>
								+
							</button>
						</td>
						<td
							colspan="1"
							rowspan={rowIndex === operator.kernel.length - 1 ? 1 : 2}
						></td>
						<td
							colspan="1"
							rowspan={rowIndex === operator.kernel.length - 1 ? 1 : 2}
						></td>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								onclick={() => {
									handleAddRowRequest(rowIndex + 1);
								}}
							>
								+
							</button>
						</td>
					</tr>
				{/each}
				<tr>
					{#each operator.kernel[0] as cell, columnIndex (columnIndex)}
						{#if columnIndex === 0}
							<td colspan="1" rowspan="1"></td>
							<td colspan="1" rowspan="1"></td>
						{:else}
							<td colspan="2" rowspan="1"></td>
						{/if}
						<td colspan="2" rowspan="1"></td>
					{/each}
					<td colspan="1" rowspan="1"></td>
					<td colspan="1" rowspan="1"></td>
				</tr>
				<tr>
					<td colspan="2" rowspan="2"></td>
					<td colspan="2" rowspan="2">
						<button
							type="button"
							onclick={() => {
								handleAddRowRequest(operator.kernel.length);
							}}
						>
							+
						</button>
					</td>
					{#each operator.kernel[0] as cell, index (index)}
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel[0].length === 1}
								onclick={() => {
									handleRemoveColumnRequest(index);
								}}
							>
								-
							</button>
						</td>
						<td colspan="2" rowspan="2">
							<button
								type="button"
								onclick={() => {
									handleAddColumnRequest(index + 1);
								}}
							>
								+
							</button>
						</td>
					{/each}
					<td colspan="2" rowspan="2"></td>
				</tr>
				<tr></tr>
			</tbody>
		</table>
	</fieldset>
	<fieldset>
		<legend>Kernel interpretation</legend>
		<label>
			<input
				type="radio"
				name="{nodeId}-kernel-interpretation"
				value="correlating"
				checked={true}
			/>
			Correlating
		</label>
	</fieldset>
</section>

<style lang="scss">
	td {
		text-align: center;
		padding: 0;
		// border: 1px solid grey;
	}
	td > input {
		width: 40px;
	}
	table {
		border-collapse: collapse;
		width: max-content;
		height: max-content;
		border-spacing: 0;
	}
	td {
		width: calc(attr(colspan px) * 20);
		height: calc(attr(rowspan px) * 20);
	}
	tr {
		height: 20px;
	}
	.kernel-cell {
		border: 1px solid black;
	}
</style>
