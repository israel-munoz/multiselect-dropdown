# mutiselect-dropdown
## Project website
https://www.destesoft.com/multiselect-dropdown

## A JavaScript control to replace the native HTML multiselect element

This control replaces an HTMLSelect element with a similar dropdown, which will include a checkbox in each option, to allow multiple selection using an inline control.

This is a standalone control, so it doesn't require any other plugin, unless you need to implement a polyfill for older browsers.

It should work in any modern browser. As it uses some ES6 characteristics, it is recommended to use polyfills if required in deprecated browsers.

The styles of the element are based on Google Chrome's `<select>` UI, which are pretty simple. It shouldn't be a problem to adapt it to your own styles.

## Usage
### Adding required files to your project
Import the `multiSelect` class from the package in your scripts:
```Javascript
import multiSelect from 'multiselect-dropdown';
```

If you need it as a regular `<script>` tag, simply use the `multiselect-dropdown.min.js` file located inside the package source.
```HTML
<script src="[node_modules]/multiselect-dropdown/multiselect-dropdown.min.js"></script>
```
You can copy the file to a directory in your project source.

Add the `multiselect-dropdown.css` stylesheet. If using a bundler like webpack, you can import it to the main script module:
```Javascript
import 'multiselect-dropdown/multiselect-dropdown.css';
```
If using a CSS transpiler, like SASS, you can also import it to the main stylesheet:
```CSS
@import '~multiselect-dropdown/multiselect-dropdown.css';
```

Or, if you need it as a regular `<link>` tag, just import the file directly to your web page.
```HTML
<link rel="stylesheet" href="[node_modules]/multiselect-dropdown/multiselect-dropdown.css">
```

### Creating the dropdown object
For any `<select>` element, just create an instance of the `multiSelect` class:
```Javascript
const dropdown = new multiSelect(
    document.getElementById("test-select"), // target element
    {className: '', maxVisibleOptions: 0}   // options
);
```
The multiselect control will have the same classes of the select at the moment of calling this function.

The text displayed in the control will be the labels of the checked options, comma-separated. This will be updating when moving out of the control, at the moment the options list is hidden. At the same time, any listener for the `change` event of the original select control will be triggered.

Each time an option is checked, it will update the original select element, allowing to get the values from that same element.
#### Options
The `options` parameter is not required.
##### `className`
Custom class list separated by space to add to the multi-select control.
##### `maxVisibleOptions`
Max number of visible items in the options container. If unset or `0`, the element's maximum size will be determined by the element's position and viewport size.

### Reset options
To change the options of the current control, call the `setConfig` function from the muti-select object.

```JavaScript
dropdown.setConfig(
    {
        className: 'new-class',
        maxVisibleOptions: 3
    }
);
```

### Reload
If the `<select>` options are changed, calling the `reload` function from the multi-select object will update the options list.
```Javascript
dropdown.reload();
```
