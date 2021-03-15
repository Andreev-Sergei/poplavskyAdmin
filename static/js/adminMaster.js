function previewFile() {
    var preview = document.getElementById('previewOutput');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

modal = (bool) => {
    if (bool) {
        document.querySelector('body').classList.add('freeze')
        document.querySelector('html').classList.add('freeze')
        document.getElementById('modal').classList.add('active')
        document.getElementById('overlay').classList.add('active')
    } else {
        document.querySelector('body').classList.remove('freeze')
        document.querySelector('html').classList.remove('freeze')
        document.getElementById('modal').classList.remove('active')
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

document.onkeydown = function(evt) {
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