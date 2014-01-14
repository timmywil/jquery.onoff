# On-Off Toggle Switch

> Interactive, accessible toggle switches for the web

Transform checkboxes into toggle switches.

Toggle switches made for the web are often solely constructed
to change when clicked or tapped,
animating side-to-side as they toggle.
That's a good start, but some people like to *slide* toggle
switches.
Javascript is used for creation and for adding the sliding functionality, but
the toggle is purely CSS.

Customize the look of your toggle switch using [proto.io's generator](http://proto.io/freebies/onoff/).

## Getting Started

# Not Yet Released

<!-- Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/timmywil/jquery.onoff/0.0.1/dist/jquery.onoff.min.js
[max]: https://raw.github.com/timmywil/jquery.onoff/0.0.1/dist/jquery.onoff.js
 -->
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
// Start
<input type="checkbox" />
```

However, you can also start with the generated HTML to avoid [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

```html
<div class="onoffswitch">
  <input type="checkbox" class="onoffswitch-checkbox" id="myonoffswitch" />
  <label class="onoffswitch-label" for="myonoffswitch">
    <div class="onoffswitch-inner"></div>
    <div class="onoffswitch-switch"></div>
  </label>
</div>
```

Then initialize onoff:

```js
$('input[type=checkbox]').onoff();
```

## Documentation
_(Coming soon)_

## Release History
_(Nothing yet)_

## Acknowledgements
Thanks go out to the team at [proto.io](http://proto.io/) and their elegant CSS.
