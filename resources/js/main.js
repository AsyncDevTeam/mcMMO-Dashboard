const anim_circle = document.querySelectorAll('.anim-circle')

select_radio_section.forEach(e => {
    e.addEventListener('change', function () {
        changeSection(e)
    })
})

function changeSection(element) {
    const section_active = document.querySelector(`#${element.dataset.section_click}`)
    section_active.classList.replace('section-inactive', 'section-active')
    const icon = document.querySelector('.icon-hamburger')
    const infos = getBrowserInfos()
    window.scroll(0, section_active.offsetTop - infos.height / 6)

    const sidebar = document.querySelector('.sidebar-menu')
    const main = document.querySelector('main')
    const wrapper = document.querySelector('.wrapper')
    sidebar.classList.remove('open')
    main.classList.remove('sidebar-open')
    wrapper.classList.remove('sidebar-open-effect')

    if(wrapper.classList.contains('sidebar-open-effect')){
        icon.classList.replace('fa-bars', 'fa-times')
    }else{
        icon.classList.replace('fa-times', 'fa-bars')
    }
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

        let date = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`

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
    const label_store = `fLoadUser_${query}`
    try {
        const response = await fetch(requestUserStats + `?name=${encodeURIComponent(query)}`, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({name: query, csrf_token: csrfToken})
        });

        const json = await response.json();

        if (json.error) {
            setToast('error', json.error, 0);
        } else {
            if(settings.localStorage){
                localStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: json,
                        from: label_store
                    })
                )
            }else{
                sessionStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: json,
                        from: label_store
                    })
                )
            }
            return {
                status: 'success',
                data: json,
                from: label_store
            };
        }
    } catch (error) {
        setToast('error', error.message, 0);
        return {
            status: 'failed',
            data: null,
            from: label_store
        };
    }
};


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
