const urlPattern = new RegExp(
	/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
);
export function checkIfUrlIsValid(url: string): boolean {
	return urlPattern.test(url);
}
