function startDragging(id) {
    currentElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category){
    todo [currentElement]['category'] = category
}