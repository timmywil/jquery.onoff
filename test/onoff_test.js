require({
	paths: { jquery: 'libs/jquery' }
}, [
	'jquery',
	'../dist/jquery.onoff'
], function($, OnOff) {
	// noConflict for tests
	$.noConflict(true);

	// Start testing
	start();

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

	// Initialize inputs for every test
	var setupInstance = {
		setup: function() {
			this.$inputs = $('#qunit-fixture input[type=checkbox]').onoff();
		}
	};

	/* Environment
	---------------------------------------------------------------------- */
	module('environment');

	test('vars', function() {
		expect(3);
		equal(window.jQuery, undefined, 'No jQuery globals');
		equal(window.$, undefined, 'No jQuery globals');
		equal($.isFunction(OnOff), true, 'OnOff is a function');
	});

	/* jQuery#onoff
	---------------------------------------------------------------------- */
	module('jQuery#onoff', {
		setup: function() {
			this.$inputs = $('#qunit-fixture input[type=checkbox]');
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

	test('does not replace existing IDs', function() {
		expect(1);
		this.$inputs.onoff();
		equal(this.$inputs.first().attr('id'), 'myonoffswitch', 'ID no overwritten');
	});

	test('created container inherits classes from the input', function() {
		expect(2);
		var cls = 'extra-class';
		this.$inputs.addClass(cls).onoff().each(function() {
			ok(this.parentNode.className.indexOf(cls) > -1, 'Parent has class');
		}).removeClass(cls);
	});

	/* Methods
	---------------------------------------------------------------------- */
	module('jQuery#onoff methods', setupInstance);

	test('disable()/isDisabled()/enable()', function() {
		expect(4);
		this.$inputs.each(function() {
			var $this = $(this);
			$this.onoff('disable');
			ok($this.onoff('isDisabled'), 'OnOff should be disabled');
			$this.onoff('enable');
			ok(!$this.onoff('isDisabled'), 'OnOff should be enabled');
		});
	});

	test('destroy()', function() {
		expect(4);
		this.$inputs.each(function() {
			var $this = $(this);
			var instance = $this.onoff('instance');
			$this.onoff('destroy');
			equal($.data(this, OnOff.datakey), undefined, 'Data removed');
			ok(instance.disabled, 'OnOff disabled');
		});
	});

	test('unwrap()', function() {
		expect(6);
		this.$inputs.each(function() {
			var $this = $(this).onoff('unwrap');
			var instance = $this.onoff('instance');
			equal($this.parent('.onoffswitch').length, 0, 'Container removed');
			equal($this.next('label[for="' + this.id + '"]').length, 0, 'Label removed');
			ok(instance.disabled, 'OnOff disabled');
		});
	});

	test('wrap()', function() {
		expect(2);
		this.$inputs.each(function() {
			var $this = $(this);
			var instance = $this.onoff('instance');
			equal(
				$('<div/>').html(instance.$con.clone()).html()
					.replace(/\s*checked="\w*"/i, '')
					.replace(/\s*id="\w*"/i, '')
					.replace(/\s*for="\w*"/i, '')
					.replace(/\s*value="\w*"/i, '')
					.replace(/\s*type="\w*"/i, '')
					.replace(/\s*name="\w*"/i, ''),

				['<div class="onoffswitch">',
					'<input class="onoffswitch-checkbox">',
					'<label class="onoffswitch-label">',
						'<span class="onoffswitch-inner"></span>',
						'<span class="onoffswitch-switch"></span>',
					'</label>',
				'</div>'].join(''),

				'Validate generated HTML'
			);
		});
	});

	/* Options
	---------------------------------------------------------------------- */
	module('jQuery#onoff options', setupInstance);

	test('option()', function() {
		expect(8);
		this.$inputs.each(function() {
			var options = $(this).onoff('option');
			ok($.isPlainObject(options), 'Calling option() returns all options');
			ok(~options.namespace.indexOf(OnOff.defaults.namespace), 'Event namespace starts with the default');
			ok(/\d+$/.test(options.namespace), 'Namespace ends with uuid');
			equal(options.className, OnOff.defaults.className, 'Event namespace is the default');
		});
	});

	test('namespace', function() {
		expect(4);
		this.$inputs.each(function() {
			var $this = $(this);
			var ns = $this.onoff('option', 'namespace');
			$this.onoff('option', 'namespace', 'newspace');
			equal($this.onoff('option', 'namespace'), 'newspace', 'Namespace changed');
			$this.onoff('option', 'namespace', ns);
			equal($this.onoff('option', 'namespace'), ns, 'Namespace reset');
		});
	});

	test('className', function() {
		expect(10);
		this.$inputs.each(function() {
			var $this = $(this);
			var cls = $this.onoff('option', 'className');
			equal(cls, OnOff.defaults.className, 'Current className is the default');
			$this.onoff('option', 'className', 'newclass');
			ok($this.hasClass('newclass'), 'New class added to element');
			ok(!$this.hasClass(cls), 'Old class removed');
			$this.onoff('option', 'className', cls);
			ok(!$this.hasClass('newclass'), 'New class removed');
			ok($this.hasClass(cls), 'Old class added back');
		});
	});
});
