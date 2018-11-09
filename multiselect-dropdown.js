/*! multiselect-dropdown v1.0
 *  Multi-select drop-down control to replace regular select element.
 *  https://github.com/israel-munoz/multiselect-dropdown
 */
window.multiSelect = (function () {
  'use strict';

  var defaultOptions = {
    className: '',
    maxVisibleOptions: 0
  };

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
    if (className.indexOf(' ') >= 0) {
      var classNames = className.split(' ');
      for (var i = 0; i < classNames.length; i += 1) {
        addClass(element, classNames[i]);
      }
    } else if (element.classList) {
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
    if (className.indexOf(' ') >= 0) {
      var classNames = className.split(' ');
      for (var i = 0; i < classNames.length; i += 1) {
        removeClass(element, classNames[i]);
      }
    } else if (element.classList) {
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
      var options = control.querySelector('.multi-select-options'),
        maxHeight;
      if (options.children && control.multiSelect && control.multiSelect.maxVisibleOptions) {
        maxHeight = options.children[0].clientHeight * control.multiSelect.maxVisibleOptions;
      } else {
        maxHeight = window.innerHeight - options.getBoundingClientRect().y - 10;
      }
      options.style.maxHeight = maxHeight > 0 ? maxHeight + 'px' : '100%';
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

  function setMultiselectOptions(select, optionsList) {
    var options = select.querySelectorAll('option'),
      i, j = options.length;
    for (i = 0; i < j; i += 1) {
      optionsList.appendChild(createMultiselectOption(options[i]));
    }
  }

  function createMultiselect(select, options) {
    options = Object.assign({}, defaultOptions, options || {});
    if (hasClass(select.parentElement, 'multi-select')) {
      if (options.className) {
        addClass(select.parentElement, options.className);
      }
      select.parentElement.multiSelect = options;
      return createMultiselect.reload(select);
    }
    var control = document.createElement('div'),
      display = document.createElement('div'),
      list = document.createElement('div');
    control.multiSelect = options;
    control.className = select.className;
    if (options.className) {
      addClass(control, options.className);
    }
    addClass(control, 'multi-select');
    addClass(display, 'multi-select-display');
    addClass(list, 'multi-select-options');
    setMultiselectOptions(select, list);
    select.multiple = true;
    display.addEventListener('click', displayClicked, false);
    wrap(select, control);
    control.appendChild(display);
    control.appendChild(list);
    updateDisplay(control);
  }

  createMultiselect.reload = function (select) {
    var multiSelect = select.parentElement;
    if (hasClass(multiSelect, 'multi-select')) {
      var list = multiSelect.querySelector('.multi-select-options');
      list.innerHTML = '';
      setMultiselectOptions(select, list);
    }
  }

  return createMultiselect;
}());
