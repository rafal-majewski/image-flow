export async function loadImageFromUrl(url: string): Promise<ImageData> {
	const img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = url;
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
