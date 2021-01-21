# mutiselect-dropdown
Multi-select drop-down control to replace regular select element.

This control replaces an HTMLSelect element with a similar dropdown, which will include a checkbox in each option, to allow multiple selection in an inline control.

This is a standalone control, so it doesn't require any other plugin, unless you need to implement a polyfill for older browsers.

It should work in any recent browser. The most "recent" thing I'm using here is `querySelector` and `classList`, but for the latest I added functions to cover unsupported browsers.

The styles of the element are based on Google Chrome's `<select>` UI, which are pretty simple. It shouldn't be a problem to adapt it to your own styles.

## Usage
For any `<select>` element, just create an instance of the `window.multiSelect` class:
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
