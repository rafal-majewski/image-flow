export class ErrorDiffusionDitheringMapperOperatorKernel {
	private constructor(
		multipliersAtLeftCenterCount: number,
		multipliersAtRightCenter: readonly number[],
		multiplierRowsAtBottom: readonly {
			left: readonly number[];
			center: number;
			right: readonly number[];
		}[],
	) {
		this.multipliersAtLeftCenterCount = multipliersAtLeftCenterCount;
		this.multipliersAtRightCenter = multipliersAtRightCenter;
		this.multiplierRowsAtBottom = multiplierRowsAtBottom;
	}
	public static createEmpty(): ErrorDiffusionDitheringMapperOperatorKernel {
		return new ErrorDiffusionDitheringMapperOperatorKernel(0, [], []);
	}
	/**
	 * Inserts a new row where the anchor is. The row which was there before the anchor will be moved down.
	 */
	public insertFirstRow(): ErrorDiffusionDitheringMapperOperatorKernel {
		return new ErrorDiffusionDitheringMapperOperatorKernel(
			this.multipliersAtLeftCenterCount,
			this.multipliersAtRightCenter.map(() => {
				return 0;
			}),
			[
				{
					left: new Array(this.multipliersAtLeftCenterCount).fill(0),
					center: 0,
					right: this.multipliersAtRightCenter,
				},
				...this.multiplierRowsAtBottom,
			],
		);
	}
	/**
	 * Inserts a new row somewhere under the anchor.
	 */
	public insertNonFirstRow(
		/**
		 * Starting at 0, which would be the first row under the anchor.
		 */
		bottomRowIndex: number,
	): ErrorDiffusionDitheringMapperOperatorKernel {
		return new ErrorDiffusionDitheringMapperOperatorKernel(
			this.multipliersAtLeftCenterCount,
			this.multipliersAtRightCenter,
			[
				...this.multiplierRowsAtBottom.slice(0, bottomRowIndex),
				{
					left: new Array(this.multipliersAtLeftCenterCount).fill(0),
					center: 0,
					right: this.multipliersAtRightCenter.map(() => {
						return 0;
					}),
				},
				...this.multiplierRowsAtBottom.slice(
					bottomRowIndex,
					this.multiplierRowsAtBottom.length,
				),
			],
		);
	}
	public readonly multiplierRowsAtBottom: readonly {
		readonly left: readonly number[];
		readonly center: number;
		readonly right: readonly number[];
	}[];
	public readonly multipliersAtLeftCenterCount: number;
	public readonly multipliersAtRightCenter: readonly number[];
}
