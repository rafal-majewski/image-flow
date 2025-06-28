<script lang="ts">
	import {Coordinates} from "../../../../../../../coordinates/Coordinates.ts";
	import type {NodeId} from "../../../../../../id/NodeId.ts";
	import type {ConvolutingOrCorrelatingMapperOperator} from "../ConvolutingOrCorrelatingMapperOperator.ts";
	import {convolutingRotationApplier} from "../rotation-applier/implementations/convoluting/instance/convolutingRotationApplier.ts";
	import {correlatingRotationApplier} from "../rotation-applier/implementations/correlating/instance/correlatingRotationApplier.ts";
	const {
		nodeId,
		operator,
		onSetOperatorRequest,
	}: {
		readonly nodeId: NodeId;
		readonly operator: ConvolutingOrCorrelatingMapperOperator;
		readonly onSetOperatorRequest: (
			operator: ConvolutingOrCorrelatingMapperOperator,
		) => void;
	} = $props();
	function handleAddRowRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewKernel(operator.kernel.withNewMultipliersRow(number_)),
		);
	}
	function handleRemoveRowRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewKernel(operator.kernel.withoutMultipliersRow(number_)),
		);
	}
	function handleAddColumnRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewKernel(operator.kernel.withNewMultipliersColumn(number_)),
		);
	}
	function handleRemoveColumnRequest(number_: number): void {
		onSetOperatorRequest(
			operator.withNewKernel(operator.kernel.withoutMultipliersColumn(number_)),
		);
	}
	function handleChangeCellRequest(
		position: Coordinates,
		newValue: number,
	): void {
		onSetOperatorRequest(
			operator.withNewKernel(
				operator.kernel.withNewMultipliersCell(position, newValue),
			),
		);
	}
	function handleChangeAnchorPositionRequest(
		newAnchorPosition: Coordinates,
	): void {
		onSetOperatorRequest(
			operator.withNewKernel(
				operator.kernel.withNewAnchorPosition(newAnchorPosition),
			),
		);
	}
	function handleSetCorrelatingRotationApplierRequest(): void {
		onSetOperatorRequest(
			operator.withNewRotationApplier(correlatingRotationApplier),
		);
	}
	function handleSetConvolutingRotationApplierRequest(): void {
		onSetOperatorRequest(
			operator.withNewRotationApplier(convolutingRotationApplier),
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
				checked={operator.rotationApplier === correlatingRotationApplier}
				onchange={() => {
					handleSetCorrelatingRotationApplierRequest();
				}}
			/>
			Correlating
		</label>
		<label>
			<input
				type="radio"
				name="{nodeId}-kernel-interpretation"
				value="convoluting"
				checked={operator.rotationApplier === convolutingRotationApplier}
				onchange={() => {
					handleSetConvolutingRotationApplierRequest();
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
