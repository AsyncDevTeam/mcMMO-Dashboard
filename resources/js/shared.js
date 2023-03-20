const requestLeaderboard = "resources/php/scripts/get_all_leaderboard.php"
const requestTopLeaderboard = "resources/php/scripts/get_top_leaderboard.php"
const requestServerStats = "resources/php/scripts/get_server_stats.php"
const requestUserStats = "resources/php/scripts/get_user_stats.php"
const server_ip = document.querySelectorAll('.server-ip')
const copyToClipboardAction = document.querySelectorAll('.copyToClipboardAction')
const copyToClipboard = document.querySelector('.copyToClipboard')
const server_player = document.querySelectorAll('.server-player')
const max_players_a = document.querySelectorAll('.max_players')
const version = document.querySelectorAll('.version')
const select_radio_section = document.querySelectorAll('.select-radio-section')
const chart_select = document.querySelector('#chart_select')
const backToTop = document.querySelectorAll('.backToTop')
const tog_dm_icon = document.querySelectorAll('.fa-circle-half-stroke')
const main = document.querySelector('main')
const darkM = document.querySelector("#darkMode-input")
const csrfToken = document.getElementById("csrf_token").value;
let languageSelect
let isBrowserOnline = true
let label__darkMode = 'dark-mode-mcMMO'
let options_collapsible = {accordion: false}
let exact_type = window.location.pathname.split("/").at(-1).split('.')[0]
const loading_bar = document.querySelector('.loading-bar')
let error_internal_server = false


function setToast(type, text, timer){
    let options_toast
    if(timer !== 0){
        options_toast = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            showCloseButton:true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }
    }else{
        options_toast = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton:true,
        }
    }
    const Toast = Swal.mixin(options_toast)
    Toast.fire({
        icon: type,
        title: text,
    })
}

if(translation.user.active === true){
    languageSelect = 'user'
    changeLanguage('user')
}
else{
    languageSelect = 'default'
    changeLanguage('default')
}

darkM.addEventListener('change', (e) => {
    if(e.target.checked){
        document.documentElement.classList.add('toggle_dark_mode');
        sessionStorage.setItem(label__darkMode, 'true')
    }else{
        document.documentElement.classList.remove('toggle_dark_mode');
        sessionStorage.setItem(label__darkMode, 'false')
    }
    tog_dm_icon.forEach(e => {
        e.classList.toggle('rotate180')
    })
})

const ss_dm = sessionStorage.getItem(label__darkMode)
if(ss_dm === 'true'){
    document.documentElement.classList.add('toggle_dark_mode')
    darkM.checked = true
}

function changeLanguage(value){
    const id_ = '#'
    const class_ = '.'
    let type = window.location.pathname.substring(
        window.location.pathname.indexOf("/") + 1,
        window.location.pathname.lastIndexOf(".")
    )

    const sections = translation[value].content_page.section_names[exact_type]
    const sc_name_b = translation[value].content_page.aside[exact_type]
    changeLanguageElement(sections, id_)
    changeLanguageElement(sc_name_b, class_)

    const sc_name_h = translation[value].content_page.aside.header
    const search = translation[value].content_page.search
    const select = translation[value].content_page.select
    const quickView = translation[value].content_page.quickView
    const buttons = translation[value].content_page.buttons
    const tabs = translation[value].content_page.tabs
    const ab = translation[value].ab

    changeLanguageElement(tabs, class_)
    changeLanguageElement(sc_name_h, class_)

    changeLanguageElement(search, class_, true)
    changeLanguageElement(search, class_)

    changeLanguageElement(select, class_)
    changeLanguageElement(quickView, class_)
    changeLanguageElement(buttons, class_)

    if(!['user', 'search-user'].includes(type)){setTable(ab)}

    function setTable(ab){
        const row_table_def = document.querySelectorAll('.row_table_def')
        row_table_def.forEach(e => {
            const player = document.createElement('th')
            const total = document.createElement('th')
            player.innerHTML = 'player'
            total.innerHTML = 'Total'
            e.appendChild(player)
            e.appendChild(total)
            Object.values(ab).forEach(a => {
                const th = document.createElement('th')
                th.innerHTML = a.toString()
                e.appendChild(th)
            })
        })
    }
}

(function setGradient(){
    const r = document.querySelector(':root');
    r.style.setProperty('--grad1', settings.colors.page.gradient.gradient_1);
    r.style.setProperty('--grad2', settings.colors.page.gradient.gradient_2);
}());

(function setTitle(){
    document.title = translation[languageSelect].pages_name[exact_type]
}());

(function (){
    const class_ = '.'
    if(translation.user.active === true){
        languageSelect = 'user'
    }else{
        languageSelect = 'default'
    }
    const tabs = translation[languageSelect].content_page.tabs
    changeLanguageElement(tabs, class_)
}());

function changeLanguageElement(entry, selector, s = null){

    if(entry !== undefined){
        if(s){
            Object.entries(entry).forEach(e => {
                const el = document.querySelectorAll(selector + e[0])
                if(el.length !== 0){
                    el.forEach(u => {
                        u.placeholder = e[1].toString()
                    })
                }
            })
        }else{
            Object.entries(entry).forEach(e => {
                const el = document.querySelectorAll(selector + e[0])
                if(el.length !== 0){
                    el.forEach(u => {
                        u.innerHTML = e[1].toString()
                    })
                }
            })
        }
    }
}

const fLoadServerInfos = async() => {
    try {
        return await fetch(requestServerStats, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded",},
            body: new URLSearchParams({ csrf_token: csrfToken }),
        })
            .then((response) => response.json())
            .then((json) => {return json})
    } catch (error) {
        console.log(error, error.message)
        return false
    }
}

const fLoadTopLeaderboard = async() => {
    try {
        const response = await fetch(requestTopLeaderboard, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({csrf_token: csrfToken}),
        });
        const leaderboard = await response.json()
        return {
            status: 'success',
            data: leaderboard,
            from: 'fLoadTopLeaderboard'
        };
    } catch (error) {
        console.error(error)
        return {
            status: 'failed',
            data: null,
            from: 'fLoadTopLeaderboard'
        };
    }
}
const fLoadLeaderboard = async() => {
    try {
        const response = await fetch(requestLeaderboard, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ csrf_token: csrfToken }),
        });
        const leaderboard = await response.json()
        return {
            status: 'success',
            data: leaderboard,
            from: 'fLoadLeaderboard'
        };
    } catch (error) {
        console.error(error)
        return {
            status: 'failed',
            data: null,
            from: 'fLoadLeaderboard'
        };
    }
}

function iconModifier(elems, uni){
    if(uni){
        const li = elems.querySelectorAll('li');
        li.forEach(e => {e.classList.remove('active')})
        const co_header = elems.querySelectorAll('.collapsible-header');
        co_header.forEach(a => {
            const co_body = a.closest('li').querySelector('.collapsible-body');
            const i = a.querySelector('.fa-solid')
            if(i !== null && i.classList.contains("fa-chevron-right")){
                changeIconCollapsible(co_body, i)
            }
        })
    }else{
        elems.forEach(e => {
            const co_header = e.querySelectorAll('.collapsible-header');
            co_header.forEach(a => {
                const co_body = a.closest('li').querySelector('.collapsible-body');
                a.addEventListener('click', function (){
                    const i = a.querySelector('.fa-solid')
                    if(i !== null && i.classList.contains("fa-chevron-right")){
                        changeIconCollapsible(co_body, i)
                    }
                })
            })
        })
    }

    function changeIconCollapsible(element, i){
        if(window.getComputedStyle(element).display === 'none'){
            //access 2
            i.classList.add('rotate')
        }else{
            //access 1
            i.classList.remove('rotate')
        }
    }
}

function classModifier(element, class_, type){
    if(type === 'a'){
        element.forEach(e => {e.classList.add(class_)})
    }else if(type === 'r'){
        element.forEach(e => {e.classList.remove(class_)})
    }else{
        element.forEach(e => {e.classList.toggle(class_)})
    }
}