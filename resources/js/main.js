const anim_circle = document.querySelectorAll('.anim-circle')

select_radio_section.forEach(e => {
    e.addEventListener('change', function () {
        changeSection(e)
    })
})

copyToClipboardAction.forEach(e => {
    e.addEventListener('click', function () {
        e.classList.add('clicked')
        navigator.clipboard.writeText(copyToClipboard.value).then(
            () => {
                setToast('success', translation[languageSelect].content_page.toast.IP_success, 5000)
            },
            () => {
                setToast('success', translation[languageSelect].content_page.toast.IP_error, 5000)
            }
        )

        setTimeout(function () {
            e.classList.remove('clicked')
        }, 1000)
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
window.onload = function () {
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

    const elems = document.querySelectorAll('.collapsible');
    let inst = M.Collapsible.init(elems, options_collapsible);
    iconModifier(elems)
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

function setServerStats(infos) {
    const hostname = infos.hostname
    const icon = infos.icon
    const max_players = infos.max_players
    const minecraft_version = infos.minecraft_version
    const online_players = infos.online_players

    if (max_players !== -1) {
        anim_circle.forEach(e => {
            e.classList.remove('off')
        })
        server_player.forEach(e => {
            e.innerHTML = online_players
        })
        max_players_a.forEach(e => {
            e.innerHTML = max_players
        })
    } else {
        anim_circle.forEach(e => {
            e.classList.add('off')
        })
        server_player.forEach(e => {
            e.innerHTML = "0"
        })
        max_players_a.forEach(e => {
            e.innerHTML = "0"
        })
    }

    server_ip.forEach(e => {
        e.innerHTML = hostname
    })
    version.forEach(e => {
        const regex = /§(\d)([^§]+)/g;
        e.innerHTML = minecraft_version.replace(regex, '<span class="c-$1">$2</span>')
    })
    server_logo.src = icon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = icon
    copyToClipboard.value = hostname
}

function createElement(type, classAdd) {
    const el = document.createElement(type)
    el.classList.add(classAdd)
    return el
}

function openSidebar(element) {
    if (!isBrowserOnline) return
    const sidebar = document.querySelector('.sidebar-menu')
    const icon = document.querySelector('.icon-hamburger')
    const main = document.querySelector('main')
    const wrapper = document.querySelector('.wrapper')
    sidebar.classList.toggle('open')
    main.classList.toggle('sidebar-open')
    wrapper.classList.toggle('sidebar-open-effect')
    const width = window.getComputedStyle(element).width

    if(wrapper.classList.contains('sidebar-open-effect')){
        icon.classList.replace('fa-bars', 'fa-times')
        element.style.width = width
    }else{
        icon.classList.replace('fa-times', 'fa-bars')
    }
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
