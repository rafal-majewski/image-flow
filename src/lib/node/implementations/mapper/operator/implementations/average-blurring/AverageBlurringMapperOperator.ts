import {Coordinates} from "../../../../../../coordinates/Coordinates.ts";
import {setEachPixel} from "../../../../../operator/setting-each-pixel/setEachPixel.ts";
import {MappingOperator} from "../../MapperOperator.ts";
export class AverageBlurringMappingOperator extends MappingOperator {
	public constructor(mixFactor: number, radius: number) {
		super(
			// @ts-expect-error
			AverageBlurringMappingOperatorDisplayer,
			"average-blurring",
			"Average blurring",
		);
		this.mixFactor = mixFactor;
		this.radius = radius;
	}
	public readonly mixFactor: number;
	public override *operate(
		inputImages: readonly [ImageData],
	): Generator<ImageData, ImageData, void> {
		const outputImage = new ImageData(
			inputImages[0].width,
			inputImages[0].height,
		);
		yield* setEachPixel(outputImage, (position) => {
			yield outputImage;
			const color = readWithAlphaColorFromImageAtPosition(
				inputImages[0],
				position,
			);
			let blurredColor = createDiscreteRgbColorFromComponent(0);
			const position = new Coordinates(
				(byteIndex / 4) % inputImages[0].width,
				Math.floor(byteIndex / 4 / inputImages[0].width),
			);
			let neighborCount = 0;
			for (
				let neighborPositionY = Math.floor(position.y - this.radius);
				neighborPositionY <= Math.ceil(position.y + this.radius);
				neighborPositionY += 1
			) {
				if (
					neighborPositionY >= 0
					&& neighborPositionY < inputImages[0].height
				) {
					for (
						let neighborPositionX = Math.floor(position.x - this.radius);
						neighborPositionX <= Math.ceil(position.x + this.radius);
						neighborPositionX += 1
					) {
						if (
							neighborPositionX >= 0
							&& neighborPositionX < inputImages[0].width
							&& ((neighborPositionX - position.x) ** 2
								+ (neighborPositionY - position.y) ** 2)
								** 0.5
								<= this.radius
						) {
							const neighborByteIndex =
								(neighborPositionY * inputImages[0].width + neighborPositionX)
								* 4;
							const neighborColor = readRgbColorFromImage(
								inputImages[0],
								neighborByteIndex,
							);
							blurredColor = {
								red: blurredColor.red + neighborColor.red,
								green: blurredColor.green + neighborColor.green,
								blue: blurredColor.blue + neighborColor.blue,
							};
							neighborCount += 1;
						}
					}
				}
			}
			blurredColor = {
				red: blurredColor.red / neighborCount,
				green: blurredColor.green / neighborCount,
				blue: blurredColor.blue / neighborCount,
			};
		});
	}
	public readonly radius: number;
	public withNewMixFactor(
		newMixFactor: number,
	): AverageBlurringMappingOperator {
		return new AverageBlurringMappingOperator(newMixFactor, this.radius);
	}
	public withNewRadius(newRadius: number): AverageBlurringMappingOperator {
		return new AverageBlurringMappingOperator(this.mixFactor, newRadius);
	}
}
