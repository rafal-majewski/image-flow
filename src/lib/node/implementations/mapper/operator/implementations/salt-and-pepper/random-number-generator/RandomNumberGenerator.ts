export class RandomNumberGenerator {
	public constructor(
		/**
		 * Integer.
		 */
		seed: number,
	) {
		this.seed = seed;
	}
	public generate(): {
		/**
		 * A number in the range <0, 1).
		 */
		readonly number: number;
		readonly newGenerator: RandomNumberGenerator;
	} {
		// remember: you dont need to normalize the seed to be in the range of 0 to 1
		const newSeed = (1664525 * this.seed + 1013904223) >>> 0;
		const number = newSeed / 0x100000000;
		return {number, newGenerator: new RandomNumberGenerator(newSeed)};
	}
	/**
	 * Integer.
	 */
	private readonly seed: number;
}
