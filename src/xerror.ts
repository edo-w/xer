import { ErrorData, ErrorDetail } from './types.js';
import { getErrorData, isErrorType } from './utils.js';

/**
 * Base class for "X" structure errors.
 * XError can be extended to create custom error types with additional metadata
 * that helps understand and troubleshoot errors.
 *
 * @typeParam TDetail - Type of the error detail object.
 */
export class XError<TDetail extends ErrorDetail = ErrorDetail> extends Error {
	/**
	 * Error ID
	 */
	id?: string;

	/**
	 * Time when the error ocurred
	 */
	time: Date;

	/**
	 * Error that caused this error to occur
	 */
	override cause?: unknown;

	/**
	 * Error code
	 */
	code?: string;

	/**
	 * Additional error information
	 */
	detail?: TDetail;

	/**
	 * Error retryable flag. Use to indicate if the operation that caused
	 * the error can be retried.
	 * @default false
	 */
	retryable: boolean;

	/**
	 * Creates an XError instance with message and details.
	 * @param message error message
	 * @param detail error detail
	 */
	constructor(message?: string, detail?: TDetail) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.message = message ?? '';

		// capturing the stack trace keeps the reference to your error class
		// for nodejs
		if (typeof (Error as any).captureStackTrace === 'function') {
			(Error as any).captureStackTrace(this, this.constructor);
		}

		this.detail = detail;
		this.retryable = false;
		this.time = new Date();
	}

	/**
	 * Returns a copy of this instance as an {@link ErrorData} object.
	 * @returns {ErrorData} object
	 */
	getData(): ErrorData {
		return getErrorData(this);
	}

	/**
	 * Returns a copy of this instance as an {@link ErrorData} object.
	 * This method is called automatically when JSON.stringify() is called.
	 * @returns {ErrorData} object
	 */
	toJSON(): ErrorData {
		return this.getData();
	}

	/**
	 * Checks if the error is the same as the given type.
	 * @param type error type
	 * @returns true if same, false otherwise
	 */
	is<TType extends Error | unknown>(type: TType): this is TType {
		return isErrorType(this, type);
	}

	/**
	 * Sets error message property
	 * @param message error message
	 * @returns this instance
	 */
	setMessage(message: string): this {
		this.message = message;
		return this;
	}

	/**
	 * Sets error ID property
	 * @param id error id
	 * @returns this instance
	 */
	setId(id: string): this {
		this.id = id;
		return this;
	}

	/**
	 * Sets error code property
	 * @param code error code
	 * @returns this instance
	 */
	setCode(code: string): this {
		this.code = code;
		return this;
	}

	/**
	 * Sets error cause property
	 * @param cause error cause
	 * @returns this instance
	 */
	setCause(cause: unknown): this {
		this.cause = cause;
		return this;
	}

	/**
	 * Sets error detail
	 * @param detail error detail
	 * @returns this instance
	 */
	setDetail(detail: TDetail): this {
		this.detail = detail;
		return this;
	}

	/**
	 * Sets retryable flag
	 * @param retryable retryable flag
	 * @returns this instance
	 */
	setRetryable(retryable: boolean): this {
		this.retryable = retryable;
		return this;
	}
}
