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
const container_chart = document.querySelector('.tint_container');
let chart_example
// -----------------------------------------
const input_color = document.querySelectorAll('input[type="color"]')
const input_text = document.querySelectorAll('input[type="text"]')
const modifySetup = function(e) {
    // console.log(e.id, e.value)
    const r = document.querySelector(':root')
    r.style.setProperty(e.id, e.value)

    const parent = e.closest('.line')
    parent.querySelector('input[type="text"]').setAttribute("value", e.value)

    if(e.id.includes('--tint')) {
        chart_example.data.datasets[0].backgroundColor = generateColors(7)
        chart_example.update()
    }else{
        switch (e.id) {
            case "tint_gradient":
                let inp_colors = container_chart.querySelectorAll('input[type="color"]')
                const matchingColors = getMatchingColors(e.value); // Returns an array of 6 matching colors in the same tone as red
                for (let i = 0; i < matchingColors.length; i++) {
                    inp_colors[i].value = matchingColors[i]
                    r.style.setProperty(`--tint${i}`, matchingColors[i])
                }
                chart_example.data.datasets[0].backgroundColor = generateColors(7)
                chart_example.update()
                break
            case "main-color":
                r.style.setProperty("--tinted-main-light-color", hexToRGBA(e.value, false))
                break
            case "main-color-dark":
                r.style.setProperty("--tinted-main-dark-color", hexToRGBA(e.value, false))
                break
            case "secondary-color":
                r.style.setProperty("--topbar-light-color", hexToRGBA(e.value, false))
                break
        }
    }

};
//Todo: set id value to css variable to avoid switch case
input_color.forEach(e => {e.addEventListener('input', function(){modifySetup(e)})});
(() => {
    setTimeout(() => {
        const r = document.querySelector(':root');
        const tint_ = document.querySelector('.tint_');
        for (let i = 1; i < 8; i++) {
            const clone = tint_.cloneNode(true)
            const inp_color = clone.querySelector('input[type="color"]')
            const inp_text = clone.querySelector('input[type="text"]')
            clone.setAttribute('data-clone', 'in')
            clone.querySelector('.tint_label').innerHTML = `Tint${i}`
            inp_color.id = `--tint${i}`
            inp_color.name = `db-tint_${i}`
            inp_color.parentElement.setAttribute('for', `tint_${i}`)
            inp_color.setAttribute("value", rgbaToHex(r.style.getPropertyValue(`--tint${i}_50`)))
            inp_color.addEventListener('input', function(){modifySetup(inp_color)})
            inp_text.setAttribute("value", rgbaToHex(r.style.getPropertyValue(`--tint${i}_50`)))
            container_chart.appendChild(clone)
        }
    }, 2000)
})();
(() => {
    const chart = document.getElementById("chart_example").getContext("2d");
    chart_example = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ["HTML", "CSS", "JAVASCRIPT", "CHART.JS", "JQUERY", "BOOTSTRP"],
            datasets: [{
                label : 'All Abilities (exp)',
                data: [20, 40, 30, 35, 30, 20],
                hidden: false,
                backgroundColor: generateColors(7)
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {display: false}
            }
        }
    });
})();
function getMatchingColors(hexColor) {
    // Convert hex color code to RGB values
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Calculate color step
    const maxColorValue = Math.max(red, green, blue);
    const minColorValue = Math.min(red, green, blue);
    const range = maxColorValue - minColorValue;
    const step = range === 0 ? 0 : Math.round(range / 5);

    // Generate matching colors
    const matchingColors = [];
    for (let i = 0; i < 8; i++) {
        const newRed = Math.min(red + (i * step), 255);
        const newGreen = Math.min(green + (i * step), 255);
        const newBlue = Math.min(blue + (i * step), 255);
        const newColor = `#${newRed.toString(16)}${newGreen.toString(16)}${newBlue.toString(16)}`;
        matchingColors.push(newColor);
    }

    return matchingColors;
}

const saveForm = document.querySelector('#saveForm')
saveForm.onclick = function (){
    const inputs = form.querySelectorAll('input');
    const values = {};
    inputs.forEach(input => {
        values[input.name] = input.value;
    });
    console.log(values);

}


