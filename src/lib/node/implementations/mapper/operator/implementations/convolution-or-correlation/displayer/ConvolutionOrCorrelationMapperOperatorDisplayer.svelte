<script lang="ts">
	import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ConvolutionOrCorrelationMapperOperator} from "../ConvolutionOrCorrelationMapperOperator.ts";
	import {convolutionRotationApplier} from "../rotation-applier/implementations/convolution/instance/convolutionRotationApplier.ts";
	import {correlationRotationApplier} from "../rotation-applier/implementations/correlation/instance/correlationRotationApplier.ts";
	const {
		nodeId,
		operator,
		onSetOperatorRequest,
	}: {
		readonly nodeId: NodeId;
		readonly operator: ConvolutionOrCorrelationMapperOperator;
		readonly onSetOperatorRequest: (
			operator: ConvolutionOrCorrelationMapperOperator,
		) => void;
	} = $props();
	function handleAddRowRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.insertMultipliersRow(number)),
		);
	}
	function handleRemoveRowRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.deleteMultipliersRow(number)),
		);
	}
	function handleAddColumnRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.insertMultipliersColumn(number)),
		);
	}
	function handleRemoveColumnRequest(number: number): void {
		onSetOperatorRequest(
			operator.replaceKernel(operator.kernel.deleteMultipliersColumn(number)),
		);
	}
	function handleChangeCellRequest(
		position: Coordinates,
		newValue: number,
	): void {
		onSetOperatorRequest(
			operator.replaceKernel(
				operator.kernel.replaceMultipliersCell(position, newValue),
			),
		);
	}
	function handleChangeAnchorPositionRequest(
		newAnchorPosition: Coordinates,
	): void {
		onSetOperatorRequest(
			operator.replaceKernel(
				operator.kernel.replaceAnchorPosition(newAnchorPosition),
			),
		);
	}
	function handleSetCorrelationRotationApplierRequest(): void {
		onSetOperatorRequest(
			operator.replaceRotationApplier(correlationRotationApplier),
		);
	}
	function handleSetConvolutionRotationApplierRequest(): void {
		onSetOperatorRequest(
			operator.replaceRotationApplier(convolutionRotationApplier),
		);
	}
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
					{#each operator.kernel.multipliers[0] as cell, index (index)}
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel.dimensions.width === 1}
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
					{#each operator.kernel.multipliers[0] as cell, columnIndex (columnIndex)}
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
				{#each operator.kernel.multipliers as row, rowIndex (rowIndex)}
					<tr>
						{#if rowIndex === 0}
							<td colspan="1" rowspan="1"></td>
						{/if}
						{#each row as cell, columnIndex (columnIndex)}
							<td colspan="4" rowspan="4" class="kernel-cell">
								<input
									type="number"
									value={cell}
									onchange={(event) => {
										handleChangeCellRequest(
											new Coordinates(columnIndex, rowIndex),
											event.currentTarget.valueAsNumber,
										);
									}}
									name={`${nodeId}-kernel-cell-${columnIndex}-${rowIndex}`}
								/>
								<input
									type="radio"
									name="{nodeId}-anchor"
									checked={operator.kernel.anchorPosition.x === columnIndex
										&& operator.kernel.anchorPosition.y === rowIndex}
									onchange={() => {
										handleChangeAnchorPositionRequest(
											new Coordinates(columnIndex, rowIndex),
										);
									}}
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
								disabled={operator.kernel.dimensions.height === 1}
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
								disabled={operator.kernel.dimensions.height === 1}
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
							rowspan={rowIndex === operator.kernel.dimensions.height - 1 ?
								1
							:	2}
						></td>
						<td
							colspan="1"
							rowspan={rowIndex === operator.kernel.dimensions.height - 1 ?
								1
							:	2}
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
					{#each operator.kernel.multipliers[0] as cell, columnIndex (columnIndex)}
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
								handleAddRowRequest(operator.kernel.dimensions.height);
							}}
						>
							+
						</button>
					</td>
					{#each operator.kernel.multipliers[0] as cell, index (index)}
						<td colspan="2" rowspan="2">
							<button
								type="button"
								disabled={operator.kernel.dimensions.width === 1}
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
				checked={operator.rotationApplier === correlationRotationApplier}
				onchange={() => {
					handleSetCorrelationRotationApplierRequest();
				}}
			/>
			Correlating
		</label>
		<label>
			<input
				type="radio"
				name="{nodeId}-kernel-interpretation"
				value="convoluting"
				checked={operator.rotationApplier === convolutionRotationApplier}
				onchange={() => {
					handleSetConvolutionRotationApplierRequest();
				}}
			/>
			Convoluting
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
