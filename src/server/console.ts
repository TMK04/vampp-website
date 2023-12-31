export function logError(error: unknown) {
	if (error instanceof Error) {
		console.error(error.message, error.stack);
	} else {
		console.error(error);
	}
}
