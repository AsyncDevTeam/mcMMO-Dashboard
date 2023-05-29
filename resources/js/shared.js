const requestLeaderboard = "resources/php/scripts/get_all_leaderboard.php"
const requestAbilities = "resources/php/scripts/get_all_abilities.php"
const requestTopLeaderboard = "resources/php/scripts/get_top_leaderboard.php"
const requestServerStats = "resources/php/scripts/get_server_stats.php"
const requestUserStats = "resources/php/scripts/get_user_stats.php"
const server_ip = document.querySelectorAll('.server-ip')
const website_title = document.querySelector('#website-title')
const copyToClipboardAction = document.querySelectorAll('.copyToClipboardAction')
const button_back = document.querySelector('.back-to-top-container')
const copyToClipboard = document.querySelector('.copyToClipboard')
const server_player = document.querySelectorAll('.server-player')
const max_players_a = document.querySelectorAll('.max_players')
const version = document.querySelectorAll('.version')
const server_logo = document.querySelector('#server-logo')
const select_radio_section = document.querySelectorAll('.select-radio-section')
const chart_select = document.querySelector('#chart_select')
const tog_dm_icon = document.querySelectorAll('.fa-circle-half-stroke')
const main = document.querySelector('main')
const darkM = document.querySelector("#darkMode-input")
const csrfToken = document.getElementById("csrf_token").value;
let languageSelect
let isBrowserOnline = true
let label__darkMode = 'dark-mode-mcMMO'
let options_collapsible = {accordion: false}
let exact_type = window.location.pathname.split("/").at(-1).split('.')[0]
exact_type.length === 0 ? exact_type = 'index' : exact_type
const loading_bar = document.querySelector('.loading-bar')
let error_internal_server = false

window.onload = function (){
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, options_collapsible);
    iconModifier(elems)
    setColorsToRoot()
}
function setColorsToRoot(){
    for (let i = 1; i <= 7; i++) {
        document.documentElement.style.setProperty(`--tint${i}_50`, hexToRGBA(
            getComputedStyle(document.documentElement).getPropertyValue(`--tint${i}_`)
        ));
    }
}
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

function setToast(type, text, timer){
    let options_toast, toast_text
    if(timer !== 0){
        options_toast = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            showCloseButton: true,
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
            showCloseButton: false,
        }
    }
    if (type !== "error") {
        toast_text = text
    } else {
        toast_text = 'An error occured : ' + text + '\n\nIf you don\'t understand it, please contact the developers.'
    }
    const Toast = Swal.mixin(options_toast)
    Toast.fire({
        icon: type,
        title: toast_text,
    })
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
        button_back.classList.add('sidebar-open')
        element.style.width = width
    }else{
        icon.classList.replace('fa-times', 'fa-bars')
        button_back.classList.remove('sidebar-open')
    }
}

function setServerStats(infos) {
    const hostname = infos.hostname
    const icon = infos.icon
    const max_players = infos.max_players
    const minecraft_version = infos.minecraft_version
    const online_players = infos.online_players

    if (max_players !== -1) {
        server_player.forEach(e => {
            e.innerHTML = online_players
        })
        max_players_a.forEach(e => {
            e.innerHTML = max_players
        })
        server_player.forEach(e => {
            setTimeout(() => {
                e.closest('p').classList.add('show')
            });
        })
    } else {
        server_player.forEach(e => {
            e.innerHTML = "0"
        })
        max_players_a.forEach(e => {
            e.innerHTML = "0"
        })
        server_player.forEach(e => {
            setTimeout(() => {
                e.closest('p').classList.add('show')
            });
        })
    }
    version.forEach(e => {
        const regex = /§(\d)([^§]+)/g;
        e.innerHTML = minecraft_version.replace(regex, '<span class="c-$1">$2</span>')
        displayElement(e, minecraft_version.replace(regex, '<span class="c-$1">$2</span>'))
    })

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    isImageEmpty(icon).then(isEmpty => {
        if (isEmpty) {
            server_logo.src = "resources/others/textures/defaultLogo/def.ico"
            link.href = server_logo.src
        } else {
            server_logo.src = icon
            link.href = icon
        }
    });

    server_ip.forEach(e => {
        e.innerHTML = hostname
        displayElement(e, hostname)
    })
    copyToClipboard.value = hostname
}

function isImageEmpty(imageDataURL) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] !== 0) {
                    resolve(false);
                    return;
                }
            }
            resolve(true);
        };
        img.onerror = function() {
            resolve(false);
        };
        img.src = imageDataURL;
    });
}

languageSelect = translation.active
changeLanguage(translation.active)

website_title.innerHTML = translation[languageSelect].title_header

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
if(ss_dm === 'true' || settings.force_darkMode){
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
    const pages = translation[value].content_page.pages[exact_type]
    const select = translation[value].content_page.select
    const quickView = translation[value].content_page.quickView
    const buttons = translation[value].content_page.buttons
    const tabs = translation[value].content_page.tabs
    const ab = translation[value].ab

    changeLanguageElement(tabs, class_)
    changeLanguageElement(sc_name_h, class_)

    changeLanguageElement(search, class_, true)
    changeLanguageElement(search, class_)
    changeLanguageElement(pages, class_)

    changeLanguageElement(select, class_)
    changeLanguageElement(quickView, class_)
    changeLanguageElement(buttons, class_)

    if(!['user', 'search-user', 'comparison'].includes(type)){setTable(ab)}

    function setTable(ab){
        const row_table_def = document.querySelectorAll('.row_table_def')
        row_table_def.forEach(e => {
            const player = document.createElement('th')
            const total = document.createElement('th')
            player.innerHTML = translation[value].content_page.general.table_player_label
            total.innerHTML = translation[value].content_page.general.table_total_label
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
    r.style.setProperty('--grad1', `rgba(${settings.colors.page.gradient.gradient_1} / 100%)`)
    r.style.setProperty('--grad1_op', `rgba(${settings.colors.page.gradient.gradient_1} / 50%)`);
    r.style.setProperty('--grad2', `rgba(${settings.colors.page.gradient.gradient_2} / 100%)`);
    r.style.setProperty('--grad2_op', `rgba(${settings.colors.page.gradient.gradient_2} / 50%)`);
}());

(function setTitle(){
    document.title = translation[languageSelect].pages_name[exact_type]
}());

(function (){
    const class_ = '.'
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
        const response = await fetch(requestServerStats, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded",},
            body: new URLSearchParams({ csrf_token: csrfToken }),
        });
        const json = await response.json();
        if (json.error) {
            setToast('error', json.error, 0);
        } else {
            return json;
        }
    } catch (error) {
        setToast('error', error.message, 0);
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
        if (leaderboard.error) {
            setToast('error', leaderboard.error, 0);
        } else {
            return {
                status: 'success',
                data: leaderboard,
                from: 'fLoadTopLeaderboard'
            };
        }
    } catch (error) {
        setToast('error', error.message, 0)
        return {
            status: 'failed',
            data: null,
            from: 'fLoadTopLeaderboard'
        };
    }
}

const fLoadAbilities = async() => {
    try {
        const response = await fetch(requestAbilities, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({csrf_token: csrfToken}),
        });
        const leaderboard = await response.json()
        if (leaderboard.error) {
            setToast('error', leaderboard.error, 0);
        } else {
            return {
                status: 'success',
                data: leaderboard,
                from: 'fLoadAbilities'
            };
        }
    } catch (error) {
        setToast('error', error.message, 0)
        return {
            status: 'failed',
            data: null,
            from: 'fLoadAbilities'
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
        if (leaderboard.error) {
            setToast('error', leaderboard.error, 0)
        } else {
            return {
                status: 'success',
                data: leaderboard,
                from: 'fLoadLeaderboard'
            };
        }
    } catch (error) {
        setToast('error', error.message, 0)
    }
    // If we did not return something until here, it means that we got an error
    return {
        status: 'failed',
        data: null,
        from: 'fLoadLeaderboard'
    };
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

let sortClick = true
function sort(list, ico, element){
    var mylist = $(list)
    const icon = $(ico)[0]
    var listitems = mylist.children(element).get()

    const card_infos = document.querySelector('.card-infos')
    card_infos.classList.add('hidden')
    const cards = document.querySelectorAll('.ab-card')
    cards.forEach(e => {
        if(e.classList.contains('selected')){
            e.classList.remove('selected')
        }
    })

    if(!sortClick){
        if(ico === '.sort_N'){
            listitems.sort(function(a, b) {
                return +a.dataset.total - +b.dataset.total
            });
            icon.classList.replace('fa-arrow-down-1-9', 'fa-arrow-down-9-1')
        }else{
            listitems.sort(function(a, b) {
                return $(a).text().replace(/\d+/g, '').toUpperCase().localeCompare($(b).text().replace(/\d+/g, '').toUpperCase());
            });
            icon.classList.replace('fa-arrow-down-a-z', 'fa-arrow-down-z-a')
        }
        sortClick = true
    }else{
        if(ico === '.sort_N'){
            listitems.sort(function(b, a) {
                return +a.dataset.total - +b.dataset.total
            });
            icon.classList.replace('fa-arrow-down-9-1', 'fa-arrow-down-1-9')
        }else{
            listitems.sort(function(b, a) {
                return $(a).text().replace(/\d+/g, '').toUpperCase().localeCompare($(b).text().replace(/\d+/g, '').toUpperCase());
            });
            icon.classList.replace('fa-arrow-down-z-a', 'fa-arrow-down-a-z')
        }
        sortClick = false
    }
    $.each(listitems, function(index, item) {
        mylist.append(item);
    });
}

function displayElement(element, data){
    setTimeout(() => {
        if (element.innerText === data) {
            element.closest('p').classList.add('show')
        }
    });
}

function backToTop(){window.scroll(0, 0)}

function generateColors(numColors, value = 0) {
    let colors = [];
    if(value !== 0){
        colors.push(getComputedStyle(document.documentElement).getPropertyValue('--tint' + value % 7));
        return colors;
    }else{
        for (let i = 0; i < numColors; i++) {
            const index = i % 7;
            colors.push(getComputedStyle(document.documentElement).getPropertyValue('--tint' + (index + 1)));
        }
        return colors;
    }

}

function hexToRGBA(hex) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${.5})`
}


function getSkin(player, type) {
    let types = {
        'BODY': 'player',
        'BODY_3D': 'body',
        'BODY_3D_REVERSE': 'body',
        'HEAD': 'avatar',
        'HEAD_3D': 'head',
        'SKIN': 'skin'
    };

    if (!types[type]) {
        throw new Error(`Invalid type "${type}". Type must be one of ${Object.keys(types).join(', ')}.`);
    }

    var output = {
        url: null
    };
    if (player.bedrock === 0) {
        // Not a bedrock player, so we can directly use the name with mc-heads API
        output.url = `https://mc-heads.net/${types[type]}/${player.name}${type === 'BODY_3D_REVERSE' ? '/left' : ''}`;
    } else {
        // Bedrock player, so we should get the texture ID thanks to geyser API
        const xuidHex = player.uuid.split('-').join('').toUpperCase();
        const xuidDec = parseInt(xuidHex, 16);
        $.ajax({
            url: `https://api.geysermc.org/v2/skin/${xuidDec}`,
            timeout: 5000,
            dataType: 'json',
            async: false,
            success: function(data) {
                if (data.texture_id) {
                    output.url = `https://mc-heads.net/${types[type]}/${data.texture_id}${type === 'BODY_3D_REVERSE' ? '/left' : ''}`;
                    output.last_update = data.last_update;
                }
            }
        });
        if (output.url === null) {
            setToast('info', 'Bedrock player\'s skin can\'t be displayed for now.\nTry again later.', 5000);
            output.url = `resources/others/textures/defaultSkin/bedrock-${types[type]}${type === 'BODY_3D_REVERSE' ? '-reverse' : ''}.png`;
        }
    }
    return output;
}
