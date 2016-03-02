'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {

  function pushComponent(array, component) {
    if (!array) {
      array = [];
    }
    array.push({ name: component.getAttribute('name'), source: '' + component.textContent });
    return array;
  }

  function getComponents() {
    var components = document.getElementsByClassName('component-template');
    var componentTree = {};

    [].concat(_toConsumableArray(components)).forEach(function (component) {
      var componentType = component.getAttribute('data-type');
      componentTree[componentType] = pushComponent(componentTree[componentType], component);
    });

    return componentTree;
  }

  function createFragment() {
    return document.createDocumentFragment();
  }
  function listElementComponent() {}

  function addToElement(source, destination) {
    destination.innerHTML = source;
  }

  /* rewrite this */
  function buildComponentList(tree) {
    var fragment = createFragment();
    var components = getComponents();
    var keys = Object.keys(components);

    var list = document.createElement('ul');

    keys.forEach(function (key) {
      var listItem = document.createElement('li');
      var subList = document.createElement('ul');
      var title = document.createElement('p');
      title.textContent = key;
      listItem.appendChild(title);

      components[key].forEach(function (component) {
        var item = document.createElement('li');
        item.textContent = component.name;
        subList.appendChild(item);
      });
      listItem.appendChild(subList);
      list.appendChild(listItem);
    });
    fragment.appendChild(list);
    document.getElementById('container').appendChild(fragment);
  }
  /* end */

  // temp stuff for demo
  buildComponentList(getComponents());
  document.getElementById('addBanner').addEventListener('click', function () {
    addToElement(getComponents().information[0].source, document.querySelector('.container'));
  });
})();
