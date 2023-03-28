const anim_circle = document.querySelectorAll('.anim-circle')

select_radio_section.forEach(e => {
    e.addEventListener('change', function () {
        changeSection(e)
    })
})

function changeSection(element) {
    if (element.dataset.section_click === "backToTop")
        window.scroll(0, 0)

    const section_active = document.querySelector(`#${element.dataset.section_click}`)
    section_active.classList.replace('section-inactive', 'section-active')

    const infos = getBrowserInfos()
    window.scroll(0, section_active.offsetTop - infos.height / 8)

    const sidebar = document.querySelector('.sidebar-menu')
    const main = document.querySelector('main')
    const wrapper = document.querySelector('.wrapper')
    sidebar.classList.remove('open')
    main.classList.remove('sidebar-open')
    wrapper.classList.remove('sidebar-open-effect')
}

function getHM(TS = null) {
    let d
    if (TS !== null) {
        d = new Date(TS * 1000)
        let h = d.getHours()
        let m = d.getMinutes()
        let day = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()

        let date = `${day}/${month}/${year}`

        if (h < 10) {
            h = "0" + h
        }
        if (m < 10) {
            m = "0" + m
        }

        return {h, m, date}
    } else {
        d = new Date()
        let h = d.getHours()
        let m = d.getMinutes()
        if (h < 10) {
            h = "0" + h
        }
        if (m < 10) {
            m = "0" + m
        }
        return `${h}:${m}`
    }
}

function getBrowserInfos() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const language = window.navigator.language
    const online = navigator.onLine

    return {
        'width': windowWidth,
        'height': windowHeight,
        'lang': language,
        'online': online
    }

}

window.onscroll = function () {
    if (window.scrollY > 100) {
        backToTop.forEach(e => {
            e.classList.add('showElement')
        })
    } else {
        backToTop.forEach(e => {
            e.classList.remove('showElement')
        })
    }
}

let TEST_MODE = false
document.querySelectorAll('.offline-rule')
    .forEach(e => {
        e.innerHTML = translation[languageSelect].offline.rule
    })

const b = getBrowserInfos()
if (b.online !== true || TEST_MODE === true) {
    isBrowserOnline = false
    const hamburger_menu = document.querySelector('.hamburger-menu')
    hamburger_menu.classList.add('disable')
}

function stylePageOffline() {
    const no_co = document.querySelectorAll('.no-connection')
    const wrapper = document.querySelector('.wrapper')

    const server_off = document.querySelectorAll('.server-offline-info')
    const nb_players = document.querySelectorAll('.nb_players')

    no_co.forEach(e => {
        e.classList.remove('hidden')
    })
    wrapper.classList.add('disable')

    anim_circle.forEach(e => {
        e.classList.add('off')
    })
    nb_players.forEach(e => {
        e.classList.add('hidden')
    })
    server_off.forEach(e => {
        e.classList.remove('hidden')
    })
}

const fLoadUser = async () => {
    return await fetch(requestUserStats + `?name=${query}`, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
        body: new URLSearchParams({name: query, csrf_token: csrfToken}),
    })
        .then((response) => response.json())
        .then((json) => {return json})
        .catch(error => {console.warn(error.message)})
}

function createElement(type, classAdd) {
    const el = document.createElement(type)
    el.classList.add(classAdd)
    return el
}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 1;
    } else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function clearInput() {
    const player_research = document.querySelectorAll('.player_research')
    player_research.forEach(e => {
        e.value = ""
    })
}
