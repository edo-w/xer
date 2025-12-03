/**
 * ErrorData is used to structure the error information so it can be easily serialized into json
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
	 * error properties
	 */
	properties?: Record<string, any>;

	/**
	 * error retryable flag
	 */
	retryable: boolean;
}
