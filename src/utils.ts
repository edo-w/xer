import { ErrorData, ErrorDetail } from './types.js';
import { XError } from './xerror.js';

/**
 * Get error details from a Error object excluding name, message and stack.
 * @param error error object
 * @returns object with error detail or undefined
 */
export function getErrorDetail(error?: unknown): ErrorDetail | undefined {
	if (error === null || error == undefined) {
		return undefined;
	}

	if (error instanceof XError) {
		return error.detail;
	}

	let detail: any;
	for (const [key, value] of Object.entries(error)) {
		const skip = key === 'name'
			|| key === 'message'
			|| key === 'stack';

		if (skip) {
			continue;
		}

		detail = detail ?? {};
		detail[key] = value;
	}

	return detail;
}

/**
 * Creates a copy of the Error instance as a {@link ErrorData} object.
 * @param error error instance
 * @returns error data object
 */
export function getErrorData(error: Error | unknown): ErrorData {
	const errorRaw = error as any;
	const name = errorRaw.name ?? '';
	const message = errorRaw.message ?? '';
	const stack = errorRaw.stack?.split('\n') ?? [];

	const detail = error instanceof XError ? error.detail : getErrorDetail(error);
	const retryable = error instanceof XError ? error.retryable : true;
	const cause = errorRaw.cause ? getErrorData(errorRaw.cause) : undefined;
	const id = errorRaw.id;
	const time = errorRaw.time ?? new Date();

	return {
		name,
		message,
		stack,
		detail,
		cause,
		id,
		time,
		retryable,
	};
}

/**
 * Checks if an error instance is the same as the given type.
 * @param error error instance
 * @param type error class
 * @returns true if matches, false otherwise
 */
export function isErrorType<TType extends Error | unknown>(error: unknown | undefined | null, type: TType): error is TType {
	if (error === null || error === undefined) {
		return false;
	}

	return error instanceof (type as any);
}
/**
  * Creates an error instance with the given name, message and optional detail
  * and formatted message.
  * @param name error name
  * @param message error reason
  * @param detail error detail
  * @returns error instance
  */
export function formattedError(name: string, message: string, detail?: ErrorDetail): Error {
	let fields: string | undefined;
	if (detail) {
		fields = Object.entries(detail).map(([k, v]) => `${k}=${v}`).join(', ');
		message = `${message}. ${fields}`;
	}

	const error = new Error(message);
	error.name = name;
	(error as any).detail = detail;

	return error;
}

/**
 * Creates a formatted error message joining the message parts, along with a
 * list of key value pairs passed in the detail.
 * @param message message parts
 * @param detail error details
 * @returns message text
 */
export function messageFormat(message: string | string[], detail?: ErrorDetail): string {
	let text = '';
	if (Array.isArray(message)) {
		text = message.join(' ');
	}
	else {
		text = message;
	}

	let fields: string | undefined;
	if (detail) {
		fields = Object.entries(detail).map(([k, v]) => `${k}=${v}`).join(', ');
		text = `${text}. ${fields}`;
	}

	return text;
}
