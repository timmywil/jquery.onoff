# On-Off Toggle Switch (not yet ready for use)

> Interactive, accessible toggle switches for the web

More precisely, "multi-interactive".
Javascript-replaced UI elements on the web are tough to get right and
so often toggle switches made for the web are solely constructed to
respond to a click or touch event, animating side-to-side as
it toggles. This is all well and good, but some people like to *slide* toggle
switches. This plugin handles both while keeping accessibility in mind
when adding to the DOM.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/timmywil/jquery.onoff/1.8.5/dist/jquery.onoff.min.js
[max]: https://raw.github.com/timmywil/jquery.onoff/1.8.5/dist/jquery.onoff.js

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

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
