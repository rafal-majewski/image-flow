import {urlPattern} from "./url-pattern/urlPattern.ts";
export function checkIfUrlIsValid(url: string): boolean {
	return urlPattern.test(url);
}
