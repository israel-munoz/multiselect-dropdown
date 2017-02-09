/*! multiselect-dropdown v1.0
 *  Multi-select drop-down control to replace regular select element.
 *  https://github.com/israel-munoz/multiselect-dropdown
 */
window.multiSelect = (function () {
  'use strict';

  function triggerEvent(element, eventName) {
    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(eventName, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = eventName;
    }
    event.eventName = eventName;
    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent('on' + event.eventType, event);
    }
  }
  
  function isDescendant(control, parent) {
    var c = control;
    while (c) {
      if (c === parent) {
        return true;
      }
      c = c.parentElement;
    }
    return false;
  }
  
  function wrap(element, wrapper) {
    var parent = element.parentElement,
      wrap = typeof wrapper === 'string'
        ? document.createElement(wrapper)
        : wrapper;
    if (parent) {
      parent.insertBefore(wrap, element);
    }
    wrap.appendChild(element);
    return wrap;
  }
  
  function hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      var classes = element.className.split(' ');
      return classes.indexOf(className) >= 0;
    }
  }
  
  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      var classes = element.className.split(' '),
        index = classes.indexOf(className);
      if (index < 0) {
        classes.push(className);
        element.className = classes.join(' ');
      }
    }
  }
  
  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      var classes = element.className.split(' '),
        index = classes.indexOf(className);
      if (index >= 0) {
        classes.splice(index, 1);
        element.className = classes.join(' ');
      }
    }
  }

  function updateDisplay(control) {
    var select = control.querySelector('select'),
      options = select.children,
      display = control.querySelector('.multi-select-display'),
      i, j = options.length, option,
      labels = [];
    for (i = 0; i < j; i += 1) {
      option = options[i];
      if (option.selected) {
        labels.push(option.textContent);
      }
    }
    display.textContent = labels.join(', ');
    triggerEvent(select, 'change');
  }
  
  function displayClicked(evt) {
    var display = evt.target,
      control = display.parentElement,
      hideListener = function (evt) {
        if (isDescendant(evt.target, control)) {
          return;
        }
        removeClass(control, 'multi-select-open');
        updateDisplay(control);
        this.removeEventListener('click', hideListener);
      };
    if (hasClass(control, 'multi-select-open')) {
      removeClass(control, 'multi-select-open');
      updateDisplay(control);
    } else {
      addClass(control, 'multi-select-open');
      window.addEventListener('click', hideListener, true);
    }
  }
  
  function optionChanged(evt) {
    var input = evt.target,
      option = input._multiSelectOption;
    option.selected = input.checked;
  }
  
  function createMultiselectOption(option) {
    var item = document.createElement('div'),
      input = document.createElement('input'),
      label = document.createElement('label');

    input.type = 'checkbox';
    input.value = option.value;
    input.checked = option.selected;
    input._multiSelectOption = option;
    input.addEventListener('change', optionChanged, false);

    label.appendChild(input);
    label.appendChild(document.createTextNode(option.textContent));
    item.appendChild(label);
    return item;
  }

  function createMultiselect(select) {
    var options = select.getElementsByTagName('option'),
      control = document.createElement('div'),
      display = document.createElement('div'),
      list = document.createElement('div'),
      i, j = options.length;
    control.className = select.className;
    addClass(control, 'multi-select');
    addClass(display, 'multi-select-display');
    addClass(list, 'multi-select-options');
    for (i = 0; i < j; i += 1) {
      list.appendChild(createMultiselectOption(options[i]));
    }
    select.multiple = true;
    display.addEventListener('click', displayClicked, false);
    wrap(select, control);
    control.appendChild(display);
    control.appendChild(list);
    updateDisplay(control);
  }

  return createMultiselect;
}());
