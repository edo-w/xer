import { assert, test } from 'vitest';
import { ErrorData } from '~/types.js';
import { XError } from '~/xerror.js';

class TestError extends XError {
	constructor(message?: string, detail?: any) {
		super(message ?? 'test error', detail);
		this.retryable = false;
	}
}

test('can create', function () {
	const error = new TestError();

	assert.instanceOf(error, Error);
	assert.instanceOf(error, TestError);
	assert.equal(error.name, 'TestError');
	assert.equal(error.message, 'test error');
});

test('can create with message', function () {
	const error = new TestError('foo');
	assert.equal(error.message, 'foo');
});

test('can create with message and detail', function () {
	const detail = { foo: 'bar' };
	const error = new TestError('foo', detail);
	assert.equal(error.message, 'foo');
	assert.strictEqual(error.detail, detail);
});

test('can set message', function () {
	const error = new TestError().setMessage('foo');
	assert.equal(error.message, 'foo');
});

test('can set id', function () {
	const error = new TestError().setId('123');
	assert.equal(error.id, '123');
});

test('can set code', function () {
	const error = new TestError().setCode('XYZ');
	assert.equal(error.code, 'XYZ');
});

test('can set detail', function () {
	const detail = { foo: 'bar' };
	const error = new TestError().setDetail(detail);
	assert.strictEqual(error.detail, detail);
});

test('can set cause', function () {
	const cause = new Error();
	const error = new TestError().setCause(cause);
	assert.strictEqual(error.cause, cause);
});

test('can set retryable', function () {
	const error = new TestError().setRetryable(false);
	assert.equal(error.retryable, false);
});

test('can convert error to error data', function () {
	const detail = { foo: 'bar' };
	const error = new TestError().setDetail(detail);
	const data: ErrorData = JSON.parse(JSON.stringify(error));

	assert.equal(data.name, TestError.name);
	assert.equal(data.message, 'test error');
	assert.isTrue(Array.isArray(data.stack));
	assert.isObject(data.detail);
	assert.deepEqual(data.detail, detail);
});

test('can check type', function () {
	class FooError extends XError {};
	const error = new FooError();
	assert.equal(error.is(FooError), true);
	assert.equal(error.is(TestError), false);
});
