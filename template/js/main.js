document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add');
    const itemList = document.getElementById('itemList');
    const itemTemplate = document.getElementById('itemTemplate').content;
  
    addButton.addEventListener('click', () => {
      const newItem = itemTemplate.cloneNode(true);
      itemList.appendChild(newItem);
    });
  });
  