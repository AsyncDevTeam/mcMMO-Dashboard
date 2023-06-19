//URL to fetch data
const requestLeaderboard = "resources/php/scripts/get_all_leaderboard.php"
const requestAbilities = "resources/php/scripts/get_all_abilities.php"
const requestTopLeaderboard = "resources/php/scripts/get_top_leaderboard.php"
const requestUserStats = "resources/php/scripts/get_user_stats.php"
const requestServerStats = "resources/php/scripts/get_server_stats.php"
//Some querySelector needed in file
const website_title = document.querySelector('#website-title');
const darkM = document.querySelector("#darkMode-input")
const server_ip = document.querySelectorAll('.server-ip')
const copyToClipboardAction = document.querySelectorAll('.copyToClipboardAction')
const button_back = document.querySelector('.back-to-top-container')
const copyToClipboard = document.querySelector('.copyToClipboard')
const server_player = document.querySelectorAll('.server-player')
const max_players_a = document.querySelectorAll('.max_players')
const version = document.querySelectorAll('.version')
const server_logo = document.querySelector('#server-logo')
const select_radio_section = document.querySelectorAll('.select-radio-section')
const tog_dm_icon = document.querySelectorAll('.fa-circle-half-stroke')
const main = document.querySelector('main')
const loading_bar = document.querySelector('.loading-bar')
//Variable used in file
const csrfToken = document.getElementById("csrf_token").value;
let languageSelect
let label__darkMode = 'dark-mode-mcMMO'
let isBrowserOnline = true
let options_collapsible = {accordion: false}
let exact_type = window.location.pathname.split("/").at(-1).split('.')[0]
exact_type.length === 0 ? exact_type = 'index' : exact_type;
languageSelect = translation.active
website_title.innerHTML = translation[languageSelect].title_header
let sortClick = true
//When page is loaded. There's only one window.onload across all files
window.onload = function (){
    /**
     * Function: window.onload
     * Description: Call for generic function
     * return: none
     * */
    //Init for all Collapsible elements
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, options_collapsible);
    //Modification of chevron based on collapsible state (open/close)
    iconModifier(elems)
    //tintX colors set to html DOM element
    setColorsToRoot()
}
darkM.addEventListener('change', (e) => {
    /**
     * Function: /
     * Description: Modification of dark mode
     * If button darkM is checked we add class 'toggle_dark_mode' to document.documentElement
     * Then, we locally store state to manage cross page
     * return: none
     * */
    if(e.target.checked){
        //Dark Mode
        document.documentElement.classList.add('toggle_dark_mode');
        sessionStorage.setItem(label__darkMode, 'true')
    }else{
        //Light Mode
        document.documentElement.classList.remove('toggle_dark_mode');
        sessionStorage.setItem(label__darkMode, 'false')
    }
    //rotation of dark mode icon
    tog_dm_icon.forEach(e => {
        e.classList.toggle('rotate180')
    })
})
const ss_dm = sessionStorage.getItem(label__darkMode)
if(ss_dm === 'true' || settings.force_darkMode){
    document.documentElement.classList.add('toggle_dark_mode')
    darkM.checked = true
}

(function setGradient(){
    /**
     * Function: setGradient
     * Description:
     * Next call:
     * return: none
     * */
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
function setColorsToRoot(){
    for (let i = 1; i <= 7; i++) {
        document.documentElement.style.setProperty(`--tint${i}_50`, hexToRGBA(
            getComputedStyle(document.documentElement).getPropertyValue(`--tint${i}_`)
        ));
    }
}
const copyURL = function (){
    const select_1 = document.querySelector('#s-player-1')
    const select_2 = document.querySelector('#s-player-2')
    let value_1 = select_1.value
    let value_2 = select_2.value
    let base_url
    if(window.location.href.includes('player_1')){
        base_url = window.location.href.split('?')[0]
    }else{
        base_url = window.location.href
    }
    let cp_link = `${base_url}?player_1=${value_1}&player_2=${value_2}`
    navigator.clipboard.writeText(cp_link).then(
        () => {
            setToast('success', translation[languageSelect].content_page.toast.URL_success, 5000)
        },
        () => {
            setToast('error', translation[languageSelect].content_page.toast.URL_error, 5000)
        }
    )
}
copyToClipboardAction.forEach(e => {
    e.addEventListener('click', function () {
        e.classList.add('clicked')
        navigator.clipboard.writeText(copyToClipboard.value).then(
            () => {
                setToast('success', translation[languageSelect].content_page.toast.IP_success, 5000)
            },
            () => {
                setToast('error', translation[languageSelect].content_page.toast.IP_error, 5000)
            }
        )
        setTimeout(function () {
            e.classList.remove('clicked')
        }, 1000)
    })
})

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

changeLanguage(translation.active)
function changeLanguage(value){
    const id_ = '#'
    const class_ = '.'
    let type = window.location.pathname.substring(
        window.location.pathname.indexOf("/") + 1,
        window.location.pathname.lastIndexOf(".")
    )

    const sections = translation[value].content_page.section_names[exact_type]
    const sections_desc = translation[value].content_page.section_descriptions[exact_type]
    const sc_name_b = translation[value].content_page.aside[exact_type]
    changeLanguageElement(sections, id_)
    changeLanguageElement(sections_desc, id_)
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

    if(!['user', 'comparison'].includes(type)){setTable(ab, exact_type)}

    function setTable(ab, type){
        const row_table_def = document.querySelectorAll('.row_table_def')
        row_table_def.forEach(e => {
            const player = document.createElement('th')
            const total = document.createElement('th')
            player.innerHTML = translation[value].content_page.general.table_player_label
            total.innerHTML = translation[value].content_page.general.table_total_label
            e.appendChild(player)
            e.appendChild(total)
            if(type !== 'search-user'){
                Object.values(ab).forEach(a => {
                    const th = document.createElement('th')
                    th.innerHTML = a.toString()
                    e.appendChild(th)
                })
            }
        })
    }
}
const fLoadTopLeaderboard = async() => {
    const label_store = 'fLoadTopLeaderboard'
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
            if(settings.localStorage){
                localStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: leaderboard,
                        from: label_store
                    })
                )
            }else{
                sessionStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: leaderboard,
                        from: label_store
                    })
                )
            }
            return {
                status: 'success',
                data: leaderboard,
                from: label_store
            };
        }
    } catch (error) {
        setToast('error', error.message, 0)
        return {
            status: 'failed',
            data: null,
            from: label_store
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
    //TODO: explanation from this function to top to write
    const label_store = 'fLoadLeaderboard'
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
            if(settings.localStorage){
                localStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: leaderboard,
                        from: label_store
                    })
                )
            }else{
                sessionStorage.setItem(label_store,
                    JSON.stringify({
                        expiration: checkUnixTimestamp(),
                        expiration_date: unixTimestampToDate(checkUnixTimestamp(Math.floor(Date.now() / 1000), true).toString()),
                        status: 'success',
                        data: leaderboard,
                        from: label_store
                    })
                )
            }
            return {
                status: 'success',
                data: leaderboard,
                from: label_store
            };
        }
    } catch (error) {
        setToast('error', error.message, 0)
        return {
            status: 'failed',
            data: null,
            from: label_store
        };
    }
}
function checkUnixTimestamp(input, return_date= false) {
    /**
     * Function: checkUnixTimestamp
     * Description: This function check timestamp, to create date or verify if input date is over current date
     * @input:
     * Next call: none
     * Return the current date in a Unix timestamp, or the result of a comparison of the current date and the provided one
     * */
    let delay
    if (settings.refreshStorage === 'h') {
        delay = 60 * 60; // 1 hour
    } else if (settings.refreshStorage === '6h') {
        delay = 6 * 60 * 60; // 6 hours
    } else if (settings.refreshStorage === '12h') {
        delay = 12 * 60 * 60; // 12 hours
    } else if (settings.refreshStorage === 'd') {
        delay = 24 * 60 * 60; // 1 day
    } else{
        delay = 60
    }
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const limit = input + delay;
    if (input) {
        const date1 = new Date(currentUnixTimestamp * 1000)
        const date2 = new Date(limit * 1000)
        return (return_date) ? date2 : date1.getTime() > date2.getTime()
    } else {
        return currentUnixTimestamp;
    }
}
function unixTimestampToDate(timestamp) {
    /**
     * Function: unixTimestampToDate
     * Description: Conversion of timestamp format to DD/MM/YY HH:mm
     * @timestamp: Unix timestamp date input
     * Next call: none
     * return: none
     * */
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
function iconModifier(elems, uni){
    /**
     * Function: iconModifier
     * Description: Selection of elements to be process in changeIconCollapsible
     * @elems (Main container) is used to select children
     * @uni (boolean) to difference call from dataBaseError or window.onload
     * Next call: changeIconCollapsible function
     * return: none
     * */
    if(uni){
        //from dataBaseError
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
        //from window.onload
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
            //Add 90deg rotation
            i.classList.add('rotate')
        }else{
            //access 1
            i.classList.remove('rotate')
        }
    }
}
function classModifier(element, class_, type){
    /**
     * Function: classModifier
     * Description: This function is called from dataBaseError in case of error to disable page
     * @element: Element to apply class
     * @class_: Class to add
     * @type: /
     * Next call: none
     * return: none
     * */
    if(type === 'a'){
        element.forEach(e => {e.classList.add(class_)})
    }else if(type === 'r'){
        element.forEach(e => {e.classList.remove(class_)})
    }else{
        element.forEach(e => {e.classList.toggle(class_)})
    }
}
function sort(list, ico, element){
    /**
     * Function: sort
     * Description: This function is called to sort element in user and comparison pages
     * @list: Container to sort
     * @ico: Class of icon clicked (numerical or alphabetical)
     * @element: Element to find in order to be sort
     * Next call: none
     * return: none
     * */
    var mylist = $(list)
    const icon = $(ico)[0]
    var listitems = mylist.children(element).get()
    if(exact_type === 'user'){
        const card_infos = document.querySelector('.card-infos')
        card_infos.classList.add('hidden')
        const cards = document.querySelectorAll('.ab-card')
        cards.forEach(e => {
            if(e.classList.contains('selected')){
                e.classList.remove('selected')
            }
        })
    }
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
    /**
     * Function: displayElement
     * Description: Used to display server information with a delay on load
     * > If the content of the HTML tag is equal to the content that should be inside, the content is fully loaded
     * @element: HTML element loaded
     * @data: Content of HTML element that should be inside tag
     * Next call: none
     * return: none
     * */
    setTimeout(() => {
        if (element.innerText === data) {
            element.closest('p').classList.add('show')
        }
    });
}
function backToTop(){
    /**
     * Function: backToTop
     * Description: This function is called to scroll to the top of the page
     * Next call: none
     * return: none
     * */
    window.scroll(0, 0)
}
function generateColors(numColors, value = 0) {
    /**
     * Function: generateColors
     * Description: This function generate colors for charts
     * @numColors: Number of needed colors
     * @value: /
     * Next call: none
     * return: array of generated colors
     * */
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
    /**
     * Function: hexToRGBA
     * Description: Convert hexadecimal value to rgba format
     * @hex: Hexadecimal value
     * Next call: none
     * return: rgba conversion with .5 opacity
     * */
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${.5})`
}
function getSkin(player, type) {
    /**
     * Function: getSkin
     * Description: This function returns the skin URL of the player, considering the type needed and the game version (bedrock or java)
     * Available type in variable 'types'
     * @player: Object with name, total xp and uuid of the player
     * @type: 'types' variable related
     * Next call: none
     * return: output variable, includes type and skin url
     * */
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
        output.type = 'java'
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
        output.type = 'bedrock'
    }
    return output;
}
function changeImageTable(players, table){
    /**
     * Function: changeImageTable
     * Description: This function gets all images from the selected table and loads the head skin
     * @players: Array of all players in the table
     * @table: Modification applies to this table
     * Next call: getSkin function
     * return: none
     * */
    table.querySelectorAll('img').forEach( a => {
        //Avoiding unnecessary calls
        if(a.dataset.type !== 'default') return
        const filteredPlayers = players.filter(player => player.name === a.dataset.user);
        const uniquePlayer = filteredPlayers.find(player => player.name === a.dataset.user);
        const url = getSkin(uniquePlayer, 'HEAD_3D').url
        //If url = null, bedrock skin kept
        if(url !== null){
            a.src = url
            a.dataset.type = 'user'
        }
    })
}