import { ErrorData } from './types.js';
import { isErrorType, toErrorData } from './utils.js';

/**
 * Base class for "X" structure errors.
 * XError can be extended to create custom error types with additional metadata
 * that helps understand and troubleshoot errors.
 *
 * @typeParam TProps - Type of additional error properties
 */
export class XError<TProps extends object = Record<string, any>> extends Error {
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
	 * Additional error properties
	 */
	properties?: TProps;

	/**
	 * Error retryable flag. Use to indicate if the operation that caused
	 * the error can be retried.
	 * @default true
	 */
	retryable: boolean;

	/**
	 * Creates an XError instance with message and properties.
	 * @param message error message
	 * @param properties error properties
	 */
	constructor(message?: string, properties?: TProps) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = this.constructor.name;
		this.message = message ?? '';

		// capturing the stack trace keeps the reference to your error class
		// for nodejs
		if (typeof (Error as any).captureStackTrace === 'function') {
			(Error as any).captureStackTrace(this, this.constructor);
		}

		this.properties = properties;
		this.retryable = true;
		this.time = new Date();
	}

	/**
	 * Returns a copy of this instance as an {@link ErrorData} DTO.
	 * @returns {ErrorData} object
	 */
	toData(): ErrorData {
		return toErrorData(this);
	}

	/**
	 * Returns a copy of this instance as an {@link ErrorData} DTO.
	 * This method is called automatically when JSON.stringify() is called.
	 * @returns {ErrorData} object
	 */
	toJSON(): ErrorData {
		return this.toData();
	}

	/**
	 * Checks if the error is the same as the given type.
	 * @param type error type
	 * @returns true if same, false otherwise
	 */
	isType<TType extends Error | unknown>(type: TType): this is TType {
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
	 * Sets error properties
	 * @param properties error properties
	 * @returns this instance
	 */
	setProperties(properties: TProps): this {
		this.properties = properties;
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
