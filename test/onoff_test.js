(function($) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/

	module('jQuery#onoff', {
		setup: function() {
			this.$inputs = $('input[type=checkbox]');
		}
	});

	test('is chainable', function() {
		expect(1);
		strictEqual(this.$inputs.onoff(), this.$inputs, 'should be chainable');
	});

	test('will not work on non-checkboxes', function() {
		expect(1);
		throws(function() {
			$('#not-checkbox').onoff();
		}, 'checkboxes');
	});

})(jQuery);
