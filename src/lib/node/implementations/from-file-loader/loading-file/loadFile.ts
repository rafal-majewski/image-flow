export async function loadFile(file: File): Promise<ImageData> {
	const reader = new FileReader();
	await new Promise((resolve, reject) => {
		reader.onload = resolve;
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
	const img = new Image();
	img.src = reader.result as string;
	await new Promise((resolve, reject) => {
		img.onload = resolve;
		img.onerror = reject;
	});
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	ctx.drawImage(img, 0, 0);
	const image = ctx.getImageData(0, 0, img.width, img.height);
	return image;
}
