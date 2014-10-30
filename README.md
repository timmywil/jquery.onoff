# On-Off Toggle Switch

[![Build Status](https://travis-ci.org/timmywil/jquery.onoff.png?branch=master)](https://travis-ci.org/timmywil/jquery.onoff)

> Interactive, accessible toggle switches for the web

Transform checkboxes into toggle switches.

[![Toggle Switch](http://f.cl.ly/items/2P1i0A1N1v003A1O3S2Q/Screen%20Shot%202014-01-15%20at%202.54.24%20PM.png)](http://timmywil.github.io/jquery.onoff/)

Toggle switches made for the web are often solely constructed
to change when clicked or tapped,
animating side-to-side as they toggle.
That's a good start, but some people like to *slide* toggle
switches.
Javascript is used for creation and for adding the sliding functionality, but
the toggle is purely CSS.

Customize the look of your toggle switch using [proto.io's generator](http://proto.io/freebies/onoff/).

## Browser support

Supported browsers are the same as those supported by [jQuery 2](http://jquery.com/browser-support/). IE6-8 are not supported.

However, note that IE9 does not support CSS transitions. The toggle switches, but does not animate.

Pointer, touch, and mouse events are supported.

## Getting Started

Download the [production version][min] (4kb) or the [development version][max] and grab the [CSS][css].

[min]: https://raw.github.com/timmywil/jquery.onoff/0.4.0/dist/jquery.onoff.min.js
[max]: https://raw.github.com/timmywil/jquery.onoff/0.4.0/dist/jquery.onoff.js
[css]: https://raw.github.com/timmywil/jquery.onoff/0.4.0/dist/jquery.onoff.css

### With AMD

```js
define([ 'jquery', 'plugins/jquery.onoff' ], function( $ ) {
  $('input[type="checkbox"]').onoff();
});
```

### With Script Tags

```html
<script src="jquery.js"></script>
<script src="plugins/jquery.onoff.min.js"></script>
<script>
jQuery(function($) {
  $('input[type="checkbox"]').onoff();
});
</script>
```

## Examples

All you need is a checkbox:

```html
<input type="checkbox" />
```

However, you can also start with the generated HTML to avoid [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

```html
<div class="onoffswitch">
  <input type="checkbox" class="onoffswitch-checkbox" id="myonoffswitch" />
  <label class="onoffswitch-label" for="myonoffswitch">
    <span class="onoffswitch-inner"></span>
    <span class="onoffswitch-switch"></span>
  </label>
</div>
```

Then initialize onoff:

```js
$('input[type=checkbox]').onoff();
```

## Options

```js
OnOff.defaults = {
  // The event namespace
  // Should always be non-empty
  // Used to bind jQuery events without collisions
  namespace: '.onoff',

  // The class added to the checkbox
  className: 'onoffswitch-checkbox'
};
```

## Methods

All methods can be called widget-style.

### `option()`
Returns: If getting, the option value; if setting, the `jQuery` collection for chaining.

The `option()` method can be called with no arguments to return all options.

```js
var options = $input.onoff('option');
```

Pass a key to retrieve a single option.

```js
var eventNamespace = $input.onoff('option', 'namespace');
```

Pass a key and value or an object of key/value pairs to set options.

```js
$input.onoff('option', 'namespace', 'newspace');
$input.onoff('option', {
  namespace: 'newspace',
  className: 'newclass'
});
```

### `disable()`
Returns: `jQuery` for chaining

Disables the OnOff instance and unbinds all events.

```js
$input.onoff('disable');
```

### `isDisabled()`
Returns: `Boolean`

Returns whether the OnOff instance is currently disabled.

```js
var disabled = $input.onoff('isDisabled');
```

### `enable()`
Returns: `jQuery` for chaining

Enables the OnOff instance, rebinding events and ensuring the proper HTML.

```js
$input.onoff('enable');
```

### `wrap()`
Returns: `jQuery` for chaining

Ensures the HTML for the toggle switch is correct. This method only adds any missing HTML.

```js
$input.onoff('wrap');
```

### `unwrap()`
Returns: `jQuery` for chaining

Removes HTML related to OnOff, leaving only the checkbox.

```js
$input.onoff('unwrap');
```

### `destroy()`
Returns: `jQuery` for chaining

Disables the OnOff instance and removes data, but does not call `unwrap()`.

```js
$input.onoff('destroy');
```

### `instance()`
Returns: `OnOff`

Returns the OnOff instance.

```js
var instance = $input.onoff('instance');
```

## Release History

- **0.4.0** *10/30/2014* Corrected content inside label element
- **0.3.6** *6/23/2014* Updated `package.json`
- **0.3.5** *5/12/2014* Fixed regression with iOS devices
- **0.3.4** *3/26/2014* Update pointertouch
- **0.3.3** *3/11/2014* Fire change event when checked is changed async
- **0.3.2** *3/11/2014* Container now inherits classes from the checkbox
- **0.3.1** *3/3/2014* Minor pointertouch update
- **0.3.0** *3/3/2014* Update to full-blown pointertouch
- **0.2.4** *3/3/2014* Integrate [jquery.event.pointertouch](https://github.com/timmywil/jquery.event.pointertouch) into build.
- **0.1.0** *1/15/2014* First release

## Acknowledgements
Thanks go out to the team at [proto.io](http://proto.io/) and their elegant CSS.

## License
Copyright (c) 2014 Timmy Willison. Licensed under the MIT license.
