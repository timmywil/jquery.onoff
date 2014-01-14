/**
 * @license jquery.onoff.js v0.0.1
 * Updated: Mon Jan 13 2014
 * Accessible, interactive, touch-enabled toggle switches
 * Copyright (c) 2014 timmy willison
 * Released under the MIT license
 */

(function( global, factory ) {
	// AMD
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery' ], factory );
	// CommonJS/Browserify
	} else if ( typeof exports === 'object' ) {
		factory( require('jquery') );
	// Global
	} else {
		factory( global.jQuery );
	}
}( this, function( $ ) {
	'use strict';

	var datakey = '_onoff';
	var slice = Array.prototype.slice;

	/**
	 * Create an OnOff object for a given element
	 * @constructor
	 * @param {Element} elem - Element to use pan and zoom
	 * @param {Object} [options] - An object literal containing options to override default options
	 *  (See OnOff.defaults)
	 */
	function OnOff( elem, options ) {

		// Allow instantiation without `new` keyword
		if ( !(this instanceof OnOff) ) {
			return new OnOff( elem, options );
		}

		// Sanity checks
		if ( elem.nodeName !== 'input' || elem.type !== 'checkbox' ) {
			return $.error('OnOff should be called on checkboxes');
		}

		// Don't remake
		var d = $.data( elem, datakey );
		if ( d ) {
			return d;
		}

		// Extend default with given object literal
		// Each instance gets its own options
		this.options = options = $.extend( {}, OnOff.defaults, options );
		this.elem = elem;
		var $elem = this.$elem = $(elem);
		this.$doc = $(elem.ownerDocument || document);
		// Add guid to event namespace
		this.options.namespace += $.guid++;

		this.enable();

		// Save the instance
		$.data( elem, datakey, this );
	}

	OnOff.defaults = {
		// The event namespace
		// Should always be non-empty
		// Used to bind jQuery events without collisions
		namespace: '.onoff'
	};

	OnOff.prototype = {
		constructor: OnOff,

		/**
		 * Trigger a onoff event on our element
		 * The event is passed the Panzoom instance
		 * @param {String|jQuery.Event} event
		 * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
		 */
		_trigger: function ( event ) {
			if ( typeof event === 'string' ) {
				event = 'panzoom' + event;
			}
			this.$elem.trigger( event, [this].concat(slice.call( arguments, 1 )) );
		},

		/**
		 * @returns {Panzoom} Returns the instance
		 */
		instance: function() {
			return this;
		},

		/**
		 * Binds all necessary events
		 */
		_bind: function() {
		},

		/**
		 * Enable or re-enable the panzoom instance
		 */
		enable: function() {
			this._bind();
			this.disabled = false;
		},

		/**
		 * Unbind all events
		 */
		_unbind: function() {
		},

		/**
		 * Disable panzoom
		 */
		disable: function() {
			this.disabled = true;
			this._unbind();
		},

		/**
		 * @returns {Boolean} Returns whether the current panzoom instance is disabled
		 */
		isDisabled: function() {
			return this.disabled;
		},

		/**
		 * Destroy the panzoom instance
		 */
		destroy: function() {
			this.disable();
			$.removeData( this.elem, datakey );
		},

		/**
		 * Get/set option on an existing instance
		 * @returns {Array|undefined} If getting, returns an array of all values
		 *   on each instance for a given key. If setting, continue chaining by returning undefined.
		 */
		option: function( key, value ) {
			var options;
			if ( !key ) {
				// Avoids returning direct reference
				return $.extend( {}, this.options );
			}

			if ( typeof key === 'string' ) {
				if ( arguments.length === 1 ) {
					return this.options[ key ] !== undefined ?
						this.options[ key ] :
						null;
				}
				options = {};
				options[ key ] = value;
			} else {
				options = key;
			}

			// Set options
			$.each( options, $.proxy(function( k, val ) {
				switch( k ) {
					case 'eventNamespace':
						this._unbind();
				}
				this.options[ k ] = val;
				switch( k ) {
					case 'eventNamespace':
						this._bind();
				}
			}, this));
		}
	};

	/**
	 * Extend jQuery
	 * @param {Object|String} options - The name of a method to call on the prototype
	 *  or an object literal of options
	 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
	 */
	$.fn.onoff = function( options ) {
		var instance, args, m, ret;

		// Call methods widget-style
		if ( typeof options === 'string' ) {
			ret = [];
			args = slice.call( arguments, 1 );
			this.each(function() {
				instance = $.data( this, datakey );

				if ( !instance ) {
					ret.push( undefined );

				// Ignore methods beginning with `_`
				} else if ( options.charAt(0) !== '_' &&
					typeof (m = instance[ options ]) === 'function' &&
					// If nothing is returned, do not add to return values
					(m = m.apply( instance, args )) !== undefined ) {

					ret.push( m );
				}
			});

			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return ret.length ?
				(ret.length === 1 ? ret[0] : ret) :
				this;
		}

		return this.each(function() { new OnOff( this, options ); });
	};

	return OnOff;
}));
