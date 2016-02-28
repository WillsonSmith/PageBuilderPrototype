(function() {

  function pushComponent(array, component) {
    if (!array) {
      array = [];
    }
    array.push({name: component.getAttribute('name'), source: `${component.textContent}`});
    return array;
  }

  function getComponents() {
    let components = document.getElementsByClassName('component-template');
    let componentTree = {};

    [...components].forEach(function(component) {
      let componentType = component.getAttribute('data-type');
      componentTree[componentType] = pushComponent(componentTree[componentType], component);
    });

    return componentTree;
  }

  function createFragment() {
    return document.createDocumentFragment();
  }
  function listElementComponent() {

  }

  function addToElement(source, destination) {
    destination.innerHTML = source;
  }

/* rewrite this */
  function buildComponentList(tree) {
    let fragment = createFragment();
    let components = getComponents();
    let keys = Object.keys(components);

    let list = document.createElement('ul');

    keys.forEach(function(key) {
      let listItem = document.createElement('li');
      let subList = document.createElement('ul');
      let title = document.createElement('p');
      title.textContent = key;
      subList.appendChild(title);

      components[key].forEach(function(component) {
        let item = document.createElement('li');
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

  // console.log(getComponents());
  buildComponentList(getComponents());
})();
