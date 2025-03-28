export interface InputterNode {
	invalidate(): void;
	input(image: ImageData): void;
}
