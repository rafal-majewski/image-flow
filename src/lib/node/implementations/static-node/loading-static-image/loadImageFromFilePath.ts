export async function loadImageFromFilePath(
	imagePath: string,
): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const imageElement = new Image();
		imageElement.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = imageElement.width;
			canvas.height = imageElement.height;
			const ctx = canvas.getContext("2d");
			if (ctx === null) {
				reject(new Error("Could not get 2D context"));
			} else {
				ctx.drawImage(imageElement, 0, 0);
				const imageData = ctx.getImageData(
					0,
					0,
					imageElement.width,
					imageElement.height,
				);
				resolve(imageData);
			}
		};
		imageElement.onerror = () => {
			reject(new Error(`Failed to load image: ${imagePath}`));
		};
		imageElement.src = imagePath;
	});
}
