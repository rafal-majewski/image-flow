export interface NodeStateImageVisitor<ReturnedValue> {
	visitWithImage(image: ImageData): ReturnedValue;
	visitWithoutImage(): ReturnedValue;
}
