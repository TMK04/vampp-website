import { json } from "@sveltejs/kit";
import { logError } from "./console";

export async function formData(request: Request) {
	try {
		return request.formData();
	} catch (e) {
		logError(e);
		throw error(400, "Invalid form data");
	}
}

export function error(status: number, message: string) {
	return json({ type: "error", title: status.toString(), message });
}

export async function FastApiError(response: Response) {
	console.error(response);
	const body = await response
		.json()
		.then((data) => data["detail"])
		.catch(() => response.statusText);
	return error(response.status, body);
}
