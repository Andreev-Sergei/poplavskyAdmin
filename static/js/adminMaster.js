let createArea = new Event('buildarea')


function previewFile() {
    var preview = document.getElementById('previewOutput');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

modal = (bool, title, body, action) => {
    nodeBody = document.createElement('div')
    nodeBody.dataset.action = action
    nodeBody.innerHTML = body
    let modal = document.querySelector('.modal')
    if (bool) {
        document.querySelector('body').classList.add('freeze')
        document.querySelector('html').classList.add('freeze')
        modal.classList.add('active')
        document.getElementById('overlay').classList.add('active')
        modal.querySelector('h2').innerHTML = title
        modal.append(nodeBody)
    } else {
        document.querySelector('body').classList.remove('freeze')
        document.querySelector('html').classList.remove('freeze')
        document.querySelector('.modal').classList.remove('active')
        document.getElementById('overlay').classList.remove('active')
    }
}

document.querySelectorAll('#requests article .request').forEach(btn => {
    btn.addEventListener('click', () => {
        modal(true)
    })
})
document.getElementById('overlay').addEventListener('click', () => {
    modal(false)
})

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape) {
        modal(false)
    }
}

document.querySelectorAll('#requests .tabs .tab').forEach(btn => {
    btn.addEventListener('click', (event) => {
        document.querySelector('#requests .tabs .tab.active').classList.remove('active')
        event.target.classList.add('active')

        let sortVariable = event.target.dataset.type
        alert(sortVariable)
    })
})

document.querySelector('.areas-grid a.add').addEventListener('click', (e) => {
    e.preventDefault()
    let title = 'Добавить площадь'
    let body = ' <article>\
                    <label></label>\
                    <span>RU</span>\
                    <span>ENG</span>\
                 </article>\
                 <article>\
                        <label>Название</label>\
                        <input type="text">\
                        <input type="text">\
                 </article>\
                 <article>\
                        <label>Значение в м²:</label>\
                        <input type="number">\
                 </article>'
    modal(true, title, body)
})

document.addEventListener('DOMContentLoaded', (event) => {

    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }


    let items = document.querySelectorAll('.areas-grid .area:not(.add)');
    items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
});

let elem = document.querySelector('.modal .btn')
var event1 = new Event('build');

// Подписываемся на событие
elem.addEventListener('build', function (e) { alert(1) }, false);
elem.addEventListener('click', ()=> {
    e.preventDefault()
    dispatchEvent(event1)})
// Вызываем событие
//elem.dispatchEvent(event1);


document.getElementById('projectTitle').addEventListener('keyup', (e) => document.querySelector('h1').innerHTML = e.target.value)
//document.querySelector('projectTitle').addEventListener('keyup', (e) => document.querySelector('h1').innerHTML = e.target.value)