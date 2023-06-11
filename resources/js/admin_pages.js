fLoadServerInfos().then(async infos => {
    if (infos !== false) {
        if ('error' in infos && infos.error !== -1) {
            error_internal_server = true
            setToast('error', infos.error, 0)
            return
        }
        if (infos.max_players === -1) {
            setToast('error', 'Server offline', 0)
        } else {
            console.log('Online')
            loading_bar.classList.add('hidden')
        }
    }
});

const form = document.querySelector('.setup-form')
// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     for (let i = 0; i < form.elements.length; i++) {
//         formData.append(form.elements[i].name, form.elements[i].value)
//     }
//     accessData('POST', formData)
// });


setToast('info', '' +
    'This page is used to modify your <a href="index.php">mcMMO Dashboard</a>.\n' +
    '            You can modify language, titles, colors and more!', 10000)
const initHeightPage = () => {
    const form = document.querySelector('.setup-form')
    const header = document.querySelector('.header-settings')
    const hHeader = window.getComputedStyle(header).height
    // const element = document.querySelector('.setup-wrapper');
    // const styles = getComputedStyle(element);
    // const value = styles.getPropertyValue('--height-form');
    form.style.height = `calc(100% - ${hHeader})`
}
const accessData = function (method, data) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, 'store_data.php', true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        } else {
            console.log(xhr.status)
        }
    };
    xhr.send(data);
}

const radioButtons = document.querySelectorAll('input[name="settings-tabs"]');
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', (event) => {changeTabs(event)})
})
const changeTabs = function (el){
    let target
    target = (el.isTrusted) ? el.target : el
    const selectedRadioButton = target;
    const dataset = selectedRadioButton.dataset.select;
    const element = document.querySelector(`[data-name="${dataset}"]`)
    const all = document.querySelectorAll('[class^="page-"]')
    all.forEach(e => {e.classList.add('hidden')})
    if(element !== null){
        element.classList.remove('hidden')
    }
}
const radioInit = document.querySelector('input[data-select="mcd-settings"]')
changeTabs(radioInit)
initHeightPage()
const sections = translation[translation.active].content_page.section_names['index']
changeLanguageElement(sections, "#")

// -----------------------------------------
// All querySelector for preview element
// -----------------------------------------
const preview_container = document.querySelector('.preview-container')
const view = document.querySelector('.view')
// -----------------------------------------
const input_color = document.querySelectorAll('input[type="color"]')
const input_text = document.querySelectorAll('input[type="text"]')
//Todo: set id value to css variable to avoid switch case
input_color.forEach(e => {
    e.addEventListener('input', () => {
        // console.log(e.id, e.value)
        const r = document.querySelector(':root');
        r.style.setProperty(`--${e.id}`, e.value)
        const parent = e.closest('.line')
        parent.querySelector('input[type="text"]').setAttribute("value", e.value)
        switch (e.id) {
            case "gradient-color-start":
                r.style.setProperty(`--grad1`, e.value)
                break
            case "gradient-color-end":
                r.style.setProperty(`--grad2`, e.value)
                break
        }
    })
});
(() => {
    setTimeout(() => {
        const r = document.querySelector(':root');
        const tint_ = document.querySelector('.tint_');
        const container = document.querySelector('.tint_container');
        for (let i = 1; i < 8; i++) {
            const clone = tint_.cloneNode(true)
            const inp_color = clone.querySelector('input[type="color"]')
            const inp_text = clone.querySelector('input[type="text"]')
            clone.setAttribute('data-clone', 'in')
            clone.querySelector('.tint_label').innerHTML = `Tint${i}`
            inp_color.id = `tint_${i}`
            inp_color.name = `db-tint_${i}`
            inp_color.parentElement.setAttribute('for', `tint_${i}`)
            inp_color.setAttribute("value", rgbaToHex(r.style.getPropertyValue(`--tint${i}_50`)))
            inp_text.setAttribute("value", rgbaToHex(r.style.getPropertyValue(`--tint${i}_50`)))
            container.appendChild(clone)
        }
    }, 2000)
})()

