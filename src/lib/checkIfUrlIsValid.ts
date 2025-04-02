import {urlPattern} from "./urlPattern";
export function checkIfUrlIsValid(url: string): boolean {
	return urlPattern.test(url);
}
