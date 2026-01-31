/**
 * ErrorDetail is an alias for a record of serializable values
 */
export type ErrorDetail = Record<string, any>;

/**
 * ErrorData is used to structure error information
 */
export interface ErrorData {
	/**
	 * error id
	 */
	id?: string;

	/**
	 * time when error ocurred
	 */
	time: string;

	/**
	 * underlying error that caused this error to occur
	 */
	cause?: ErrorData;

	/**
	 * error code
	 */
	code?: string;

	/**
	 * error name
	 */
	name: string;

	/**
	 * error message
	 */
	message: string;

	/**
	 * error stack
	 */
	stack: string[];

	/**
	 * error detail
	 */
	detail?: ErrorDetail;

	/**
	 * error retryable flag
	 */
	retryable: boolean;
}
