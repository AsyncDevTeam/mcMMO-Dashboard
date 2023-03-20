const query = window.location.search.split("?q=")[1]
const title_section = document.querySelector('.title-section')
let label_player = {}
if(!isBrowserOnline){stylePageOffline()}

if(query !== undefined && isBrowserOnline){
    title_section.innerHTML = query.toString()
    setSkin(query.toString())
}

let best_player = ""
fLoadServerInfos().then(infos => {
    if(infos !== false){
        if('error' in infos && infos.error !== -1) {
            error_internal_server = true
            setToast('error', infos.error, 0)
            return
        }
        if(infos.max_players === -1){
            //Offline
            error_internal_server = true;
        }else{
            //Online
            error_internal_server = false;
            (async() => {
                try {
                    const response = await fetch(requestTopLeaderboard, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({ csrf_token: csrfToken }),
                    });
                    const leaderboard = await response.json()
                    if(leaderboard !== false){
                        best_player = leaderboard.players[0]
                        if(best_player.name === query.toString())
                            setToast('info', translation[languageSelect].content_page.toast.best_player, 7000)
                            errorCompareChart()
                    }
                    return true
                } catch (error) {
                    console.error(error)
                    return false
                }
            })().then(re => {
                (async() => {
                    try {
                        const response = await fetch(requestLeaderboard, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({ csrf_token: csrfToken }),
                        });
                        const leaderboard = await response.json()
                        if(leaderboard !== false){
                            if(re !== true){
                                setToast('error', translation[languageSelect].content_page.toast.error_db, 7000)
                                errorCompareChart()
                            }else{
                                let result_bp = leaderboard.players.find(item => item.name === best_player.name);
                                let result_cp = leaderboard.players.find(item => item.name === query.toString());
                                labelGet(leaderboard)
                                chartCompare(result_bp, result_cp)
                            }
                        }
                    } catch (error) {
                        console.error(error)
                    }
                })();
            });
        }
    }
});


function labelGet(r){
    const labels_stack = translation[languageSelect].labels_user
    const size = Object.keys(labels_stack).length
    Object.entries(labels_stack).forEach((key, index) => {
        if(typeof key[1] === 'object'){
            labGet_infos(r, key[0], key[1].infos, key[1].method)
        }else{
            labGet_infos(r, key[0], key[0], "max")
        }
        if(index === size - 1) setLabel(query.toString())
    })
}

function labGet_infos(users, key, search, test){
    const player = users.players
    const all = []
    for (let i = 0; i < player.length; i++) {
        let temp = []
        temp.push(player[i].name, player[i][search])
        all.push(temp)
    }
    const values = all.map(function(val) { return val[1] })

    for (let i = 0; i < all.length; i++) {
        if(test === 'min'){
            if(all[i][1] === Math.min.apply(null, values)){
                label_player[key] = all[i][0]
            }
        }else{
            if(all[i][1] === Math.max.apply(null, values)){
                label_player[key] = all[i][0]
            }
        }
    }
}

function errorCompareChart(){
    const abilities_level_chart_com = document.querySelector('#abilities_level_chart_com');
    abilities_level_chart_com.disabled = true
    const collapsible_user = document.querySelectorAll('.collapsible');
    let inst = M.Collapsible.init(collapsible_user, options_collapsible);
    inst[3].close()
    const element = inst[3].el
    const header = element.querySelector('li .collapsible-header')
    const header_i = header.querySelector('i')
    const body = element.querySelector('li .collapsible-body')
    body.classList.add('no-opener')
    header.classList.add('no-opener')
    header_i.classList.replace('fa-chevron-right', 'fa-lock')
    header_i.classList.remove('rotate')
}


fLoadUser().then(r => {
    if(!isBrowserOnline) return
    setBestAbilities(r)
    setAllAbilities(r)
    userData(r)
    setChart(r)
});


const ctx_compare = document.getElementById('chart_user_compare');
let chartCompareGraph
function chartCompare(best_player, current_player){

    let tp = []
    tp.push(current_player, best_player)
    let datasets = []
    for (let i = 0; i < tp.length; i++) {
        datasets.push(
            {
                label : tp[i].name,
                data : function (){
                    return tp[i].skills
                }()
            }
        )
    }
    let data_conf = {
        labels: Object.values(translation[languageSelect].ab),
        datasets: datasets,
        borderWidth: 2,
    }
    let config = {
        type: 'line',
        data: data_conf,
            options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min : 0
                }
            }
        },
    };

    chartCompareGraph = new Chart(ctx_compare, config);
}

function setLabel(player){
    if(Object.keys(label_player).length !== 0){
        const labels = getKeyByValue(label_player, player)
        if(labels.length !== 0){
            createLabel(labels)
        }
    }
}
function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] === value);
}

function createLabel(array){
    for (let i = 0; i < array.length; i++) {
        const node = document.querySelector(".label-user");
        const stackParent = document.querySelector(".labels");
        const clone = node.cloneNode(true);
        clone.setAttribute('data-clone', 'total')

        const label = clone.querySelector(".title-lu");
        const label_meaning = clone.querySelector(".title-lu-meaning");
        const element = translation[languageSelect].labels_user[array[i]]
        if(typeof element === 'object'){
            label.innerHTML = element.label
            label_meaning.innerHTML = translation[languageSelect].title[array[i]]
        }else{
            label.innerHTML = element
            label_meaning.innerHTML = translation[languageSelect].content_page.general.label_ab.replace(
                '_AB_', translation[languageSelect].ab[array[i]]
            )
        }

        clone.onclick = function openMeaning(e){
            const target = e.target
            const parent = target.closest('.label-user')
            const meaning = parent.querySelector('.title-lu-meaning')
            meaning.classList.toggle('hidden')
        }

        stackParent.appendChild(clone)
    }
}

function styleUserPageOffline(){
    console.log('Browser is offline')
}

function userData(player){
    const last_connection_user = document.querySelector('.last-connection-user')
    const last_connection = player.last_connection
    const date = getHM(last_connection)
    // last_connection_user.innerHTML = `Last connection at ${date.h}h${date.m}, ${date.date}`
    last_connection_user.innerHTML = translation[languageSelect].refresh.user
        .replace('_HOUR_', date.h)
        .replace('_MIN_', date.m)
        .replace('_DATE_', date.date)
}

function setSkin(skin){
    const img = document.querySelector('#img-skin-user')
    img.src = `https://mc-heads.net/body/${skin}`
    // img.src = `https://mineskin.eu/armor/body/${skin}/300.png`
}

const elems = document.querySelectorAll('.collapsible');
elems.forEach(e => {
    const co_header = e.querySelectorAll('.collapsible-header');
    co_header.forEach(a => {
        const co_body = a.closest('li').querySelector('.collapsible-body');
        a.addEventListener('click', function (){
            const img = a.querySelector('.img-header')
            const dataset_col = a.dataset.skin
            if(dataset_col !== undefined){
                img.src = `https://mineskin.eu/helm/${query.toString()}/300.png`
                changeSkin(co_body, img)
            }
        })
    })
    function changeSkin(element, img){
        if(window.getComputedStyle(element).display === 'none'){
            //access 2
            img.classList.replace('visible', 'hidden')
        }else{
            //access 1
            img.classList.replace('hidden', 'visible')
        }
    }
})

function getBestAbility(player){
    let skill_array = []
    let skill_array_label = []
    abilities.forEach(e => {
        skill_array.push(player[e].lvl)
        skill_array_label.push([e, player[e].lvl])
    })

    skill_array_label.sort(sortFunction)
    skill_array_label.reverse()
    let best4Ab = []
    for (let i = 0; i < 4; i++) {best4Ab.push(skill_array_label[i])}
    return {
        'best4Ab' : best4Ab,
        'skill_array' : skill_array
    }
}

function setBestAbilities(player){

    const b = getBestAbility(player)

    const node = document.querySelector(".ab-card-best");
    const stack = document.querySelector(".f-best-ab");
    const stackParent = document.querySelector(".wrapper-element-bp");
    const clone = node.cloneNode(true);
    clone.setAttribute('data-clone', 'total')
    clone.classList.add('shiny')
    const ab_title = clone.querySelector('.ab-title')
    ab_title.innerHTML = "Total"
    const ab_ar_label = clone.querySelector('.ab-bar-label')

    const totalValue = totalAbilities()
    const level = player.total

    ab_ar_label.innerHTML = `${level}/${totalValue}`

    const ab_bar = clone.querySelector('.ab-bar')
    ab_bar.style.width = Math.floor((level/totalValue)*100) + "%"
    stackParent.appendChild(clone)

    clone.addEventListener("mousemove", (e) => {
        const { x, y } = clone.getBoundingClientRect();
        clone.style.setProperty("--x", e.clientX - x);
        clone.style.setProperty("--y", e.clientY - y);
    });

    b.best4Ab.forEach(value => {
        const clone = node.cloneNode(true);
        clone.setAttribute('data-clone', 'o')
        clone.classList.add('shiny')
        const ab_title = clone.querySelector('.ab-title')
        const name = value[0]
        ab_title.innerHTML = translation[languageSelect].ab[value[0]]

        const icon = clone.querySelector('.fa-solid')
        const icon_mdi = clone.querySelector('.mdi')

        switch(name) {
            case 'taming':
                icon.classList.add('fa-heart')
                icon_mdi.classList.add('hidden')
                break;
            case 'mining':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-pickaxe')
                break;
            case 'woodcutting':
                icon.classList.add('fa-tree')
                icon_mdi.classList.add('hidden')
                break;
            case 'repair':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-anvil')
                break;
            case 'unarmed':
                icon.classList.add('fa-hand-rock')
                icon_mdi.classList.add('hidden')
                break;
            case 'herbalism':
                icon.classList.add('fa-leaf')
                icon_mdi.classList.add('hidden')
                break;
            case 'excavation':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-shovel')
                break;
            case 'archery':
                icon.classList.add('fa-bullseye')
                icon_mdi.classList.add('hidden')
                break;
            case 'swords':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-sword')
                break;
            case 'axes':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-axe')
                break;
            case 'acrobatics':
                icon.classList.add('fa-running')
                icon_mdi.classList.add('hidden')
                break;
            case 'fishing':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-fish')
                break;
            case 'alchemy':
                icon.classList.add('fa-prescription-bottle')
                icon_mdi.classList.add('hidden')
                break;
            default:
                icon.classList.add('hidden')
                icon_mdi.classList.add('hidden')
                break
        }

        const level = player[value[0]].lvl
        const level_cap = abilities_cap[value[0]]

        const ab_ar_label = clone.querySelector('.ab-bar-label')
        ab_ar_label.innerHTML = translation[languageSelect].card.best_card_label_avt
            .replace('_CURRENT_LVL_', level)
            .replace('_MAX_LEVEL_', level_cap)

        const ab_bar = clone.querySelector('.ab-bar')
        ab_bar.style.width = Math.floor((level/level_cap)*100) + "%"

        stack.appendChild(clone)
        clone.addEventListener("mousemove", (e) => {
            const { x, y } = clone.getBoundingClientRect();
            clone.style.setProperty("--x", e.clientX - x);
            clone.style.setProperty("--y", e.clientY - y);
        });
    })
}

function setAllAbilities(player){

    const node = document.querySelector(".ab-card")
    const stack = document.querySelector(".card-abilities")

    const b = getBestAbility(player)

    abilities.forEach(e => {
        const clone = node.cloneNode(true);
        clone.setAttribute('data-clone', 'o')
        clone.classList.add('shiny')

        const ab_title = clone.querySelector('.ab-title')
        ab_title.innerHTML = translation[languageSelect].ab[e]
        ab_title.setAttribute('data-ab', translation.default.ab[e])

        const icon = clone.querySelector('.fa-solid')
        const icon_mdi = clone.querySelector('.mdi')
        switch(e) {
            case 'taming':
                icon.classList.add('fa-heart')
                icon_mdi.classList.add('hidden')
                break;
            case 'mining':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-pickaxe')
                break;
            case 'woodcutting':
                icon.classList.add('fa-tree')
                icon_mdi.classList.add('hidden')
                break;
            case 'repair':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-anvil')
                break;
            case 'unarmed':
                icon.classList.add('fa-hand-rock')
                icon_mdi.classList.add('hidden')
                break;
            case 'herbalism':
                icon.classList.add('fa-leaf')
                icon_mdi.classList.add('hidden')
                break;
            case 'excavation':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-shovel')
                break;
            case 'archery':
                icon.classList.add('fa-bullseye')
                icon_mdi.classList.add('hidden')
                break;
            case 'swords':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-sword')
                break;
            case 'axes':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-axe')
                break;
            case 'acrobatics':
                icon.classList.add('fa-running')
                icon_mdi.classList.add('hidden')
                break;
            case 'fishing':
                icon.classList.add('hidden')
                icon_mdi.classList.add('mdi-fish')
                break;
            case 'alchemy':
                icon.classList.add('fa-prescription-bottle')
                icon_mdi.classList.add('hidden')
                break;
            default:
        }

        const exp = player[e].exp
        const lvl = player[e].lvl
        const next_level = player[e].max

        b.best4Ab.forEach(a => {
            if(lvl === a[1] && e === a[0]){
                const i = document.createElement('i')
                i.classList.add('fa-solid', 'fa-star')
                const div = document.createElement('div')
                div.classList.add('best-wrapper')
                const p = document.createElement('p')
                p.innerHTML = translation[languageSelect].content_page.general.best_ab
                div.appendChild(i)
                div.appendChild(p)
                clone.appendChild(div)
                clone.classList.add('best-card-in-stack')
            }
        })

        const ab_ar_label = clone.querySelector('.ab-bar-label')
        const ab_ar_label_max = clone.querySelector('.ab-bar-label-max')
        ab_ar_label.innerHTML = `${exp}`
        ab_ar_label_max.innerHTML = `${next_level}`
        const ab_ar_level = clone.querySelector('.ab-bar-level')
        ab_ar_level.innerHTML = translation[languageSelect].card.card_level_avt
            .replace('_CURRENT_LVL_', lvl)

        const ab_bar = clone.querySelector('.ab-bar')
        const ab_next_level = clone.querySelector('.ab-next-level')
        const percent = Math.floor((exp/next_level)*100)
        ab_bar.style.width = percent + "%"
        ab_next_level.innerHTML = translation[languageSelect].card.card_level_next_avt
            .replace('_EXP_PERCENT_', (100 - percent).toString())
            .replace('_EXP_LEFT_', (next_level - exp).toString())

        stack.appendChild(clone)

        clone.addEventListener("mousemove", (e) => {
            const { x, y } = clone.getBoundingClientRect();
            clone.style.setProperty("--x", e.clientX - x);
            clone.style.setProperty("--y", e.clientY - y);
        });
        clone.onclick = function (e){setRecommendation(e)}
    })

    const recommendation = document.querySelector('.content-card-m')
    const container = document.createElement('div')
    container.classList.add('def-skill')
    const container_p = document.createElement('p')
    container_p.classList.add('def-skill-p')

    const container_array = document.createElement('div')
    container_array.classList.add('container_array')

    const wrapper_levels_skills = document.createElement('div')
    wrapper_levels_skills.classList.add('wrapper_levels_skills')

    const container_table = document.createElement('div')
    container_table.classList.add('container_table')
    const container_table_info = document.createElement('div')
    container_table_info.classList.add('container_table_info')
    const container_table_info_p = document.createElement('p')
    container_table_info_p.classList.add('container_table_info_p')
    container_table_info_p.innerHTML = translation[languageSelect].recommendation.title_recommendation_avt

    container_table_info.appendChild(container_table_info_p)

    const line = document.createElement('div')
    line.classList.add('line')
    const title_array_icon = document.createElement('i')
    title_array_icon.classList.add('fa-solid', 'fa-layer-group')
    const title_array = document.createElement('h2')
    title_array.classList.add('title_array')
    title_array.innerHTML = translation[languageSelect].recommendation.info_array
    line.appendChild(title_array_icon)
    line.appendChild(title_array)

    const subtitle_array = document.createElement('p')
    subtitle_array.classList.add('subtitle_array')
    subtitle_array.innerHTML = translation[languageSelect].recommendation.title_recommendation_avt

    const link = document.createElement('a')
    link.classList.add('def-skill-link', 'btn-link')
    link.innerHTML = translation[languageSelect].recommendation.link

    function setRecommendation(e){
        // const titleR = document.querySelector('.title_recommendation_avt')
        // titleR.innerHTML =  translation[languageSelect].recommendation.title_recommendation_avt
        const cardClicked = e.target.closest('.ab-card')
        const stack = cardClicked.closest('.card-abilities')
        const width_card = window.getComputedStyle(cardClicked).width.split('px')[0]
        const left_card = cardClicked.offsetLeft
        const width_stack = window.getComputedStyle(stack).width.split('px')[0]
        const number_of_col = Math.floor(width_stack/width_card)
        const element = stack.querySelectorAll(".ab-card[data-clone='o']")
        const nodes = Array.prototype.slice.call(element)
        const index = nodes.indexOf(cardClicked)

        element.forEach(e => {e.classList.remove('selected')})
        cardClicked.classList.add('selected')

        // window.scroll(0, user_page.offsetTop + top_card - 100)

        const row = Math.floor(index/number_of_col)
        // const col = Math.floor(index%number_of_col)

        const title = cardClicked.querySelector('.ab-title')
        const card_infos = document.querySelector('.card-infos')
        const ab_sel = document.querySelector('.ab_sel')
        const arrow = card_infos.querySelector('.arrow')

        ab_sel.innerHTML = translation[languageSelect].recommendation.info
            .replace('_ABI_', title.textContent)

        arrow.style.left = `${left_card + width_card/2}px`

        card_infos.classList.remove('hidden')
        card_infos.style.gridRow = `${row + 2}`
        card_infos.style.gridColumn = `span ${number_of_col}`

        card_infos.querySelector('.close-pop-up').onclick = function (){
            card_infos.classList.add('hidden')
            cardClicked.classList.remove('selected')
        }

        container_p.innerHTML = translation[languageSelect].recommendation.ab[title.dataset.ab].def
        link.href = `https://mcmmo.fandom.com/wiki/${title.dataset.ab}`

        const levels = translation[languageSelect].recommendation.ab[title.dataset.ab].levels
        while (container_table.hasChildNodes()) {
            container_table.removeChild(container_table.children[0]);
        }
        if(typeof levels !== 'undefined'){
            const current_lvl = cardClicked.querySelector('.ab-bar-level').innerHTML.split(':')[1]

            for (let i = 0; i < levels.length; i++) {
                const level = levels[i][0]

                function createTableLevel(){
                    const tr = document.createElement('tr')
                    for (let j = 0; j < 2; j++) {
                        const td = document.createElement('td')
                        td.innerHTML = levels[i][j]
                        tr.appendChild(td)
                    }
                    tr.classList.add('row-table')
                    if(current_lvl >= level){
                        tr.classList.add('active')
                    }
                    else{
                        tr.classList.add('inactive')
                        const td = document.createElement('td')
                        const col = document.createElement('span')
                        col.classList.add('inactive')
                        const icon = document.createElement('i')
                        icon.classList.add('fa-solid', 'fa-lock')

                        col.innerHTML = (level - current_lvl) + " exp to get"
                        td.appendChild(icon)
                        td.appendChild(col)
                        tr.appendChild(td)
                    }
                    container_table.appendChild(tr)
                }
                createTableLevel()
            }
            wrapper_levels_skills.classList.remove('hidden')
            wrapper_levels_skills.appendChild(line)
            wrapper_levels_skills.appendChild(subtitle_array)
            wrapper_levels_skills.appendChild(container_array)
        }else{
            wrapper_levels_skills.classList.add('hidden')
        }
    }

    container.appendChild(container_p)
    container_array.appendChild(container_table)
    // container_array.appendChild(container_table_info)
    recommendation.appendChild(container)

    recommendation.appendChild(wrapper_levels_skills)

    recommendation.appendChild(link)
}

function totalAbilities(){
    let ar = []
    abilities.forEach(e => {
        ar.push(abilities_cap[e])
    })
    return ar.reduce((partialSum, a) => partialSum + a, 0)
}

const searchAbility = document.querySelector('.searchAbility')
searchAbility.addEventListener('keyup', () => {
    const ab_card = document.querySelectorAll(".ab-card[data-clone='o']")
    const no_element_found = document.querySelector(".no-element-found")
    let inputValue = searchAbility.value
    let filter = inputValue.toUpperCase();
    let counterStyle = 0

    for (let i = 0; i < ab_card.length; i++) {
        let object = ab_card[i].querySelector('.ab-title')
        let a = object.innerHTML;
        if (a.toUpperCase().indexOf(filter) > -1) {
            ab_card[i].style.display = 'block'
            counterStyle = 0
        } else {
            ab_card[i].style.display = 'none'
            counterStyle++
        }
    }

    if(counterStyle === abilities.length){
        no_element_found.classList.remove('hidden')
    }else{
        no_element_found.classList.add('hidden')
    }
})

function clearInputUser(){
    const ab_card = document.querySelectorAll(".ab-card[data-clone='o']")
    const no_element_found = document.querySelector(".no-element-found")

    const res = document.querySelector('#ab_research')
    res.value = ""
    for (let i = 0; i < ab_card.length; i++) {
        ab_card[i].style.display = 'block'
    }
    no_element_found.classList.add('hidden')
}

let chartAbilitiesGraphUser
const chart_user_all_abilities = document.getElementById('chart_user_all_abilities');
function setChart(player){
    let dataset = []
    let skill_array = []
    abilities.forEach(e => {
        skill_array.push(player[e].lvl)
    })

    dataset.push(
        {
            label : 'All Abilities',
            data : skill_array,
            hidden: false,
        }
    )
    let data_chart_default = {
        labels: Object.values(translation[languageSelect].ab),
        datasets: dataset,
    };
    let config = {
        type: 'bar',
        data: data_chart_default,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    chartAbilitiesGraphUser = new Chart(chart_user_all_abilities, config);
}

let sortClickA = false
function sortAlphabetical(){
    const card_infos = document.querySelector('.card-infos')
    card_infos.classList.add('hidden')
    const ab_card = document.querySelectorAll(".ab-card[data-clone='o']")
    ab_card.forEach(e => {e.classList.remove('selected')})

    var mylist = $('.card-abilities')
    const icon = $('.sort_A')[0]
    var listitems = mylist.children('div').get()

    if(!sortClickA){
        listitems.sort(function(a, b) {
            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        });
        sortClickA = true
        icon.classList.replace('fa-arrow-down-a-z', 'fa-arrow-down-z-a')
    }else{
        listitems.sort(function(b, a) {
            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        });
        sortClickA = false
        icon.classList.replace('fa-arrow-down-z-a', 'fa-arrow-down-a-z')
    }
    $.each(listitems, function(index, item) {
        mylist.append(item);
    });
}
let sortClickN = false
function sortNumber(){
    const card_infos = document.querySelector('.card-infos')
    card_infos.classList.add('hidden')
    const ab_card = document.querySelectorAll(".ab-card[data-clone='o']")
    ab_card.forEach(e => {e.classList.remove('selected')})

    var mylist = $('.card-abilities')
    var listitems = mylist.children('div').get()


    const d = document.querySelector(".card-abilities")
    sortByPoints(d)
    function sortByPoints(element) {
        Array.from(element.querySelectorAll(".ab-card")).sort((a, b) => {
            // console.log(a.querySelector(".ab-bar-level"))
            // console.log(b.querySelector(".ab-bar-level"))
            // return parseInt(a.querySelector(".ab-bar-level").textContent) - parseInt(b.querySelector(".points").textContent)
        }).forEach(item => {
            element.appendChild(item)
        })
    }

    // if(sortClickN){
    //     listitems.sort(function(a, b) {
    //         return $(a).find('.ab-bar-level').text().toUpperCase().localeCompare($(b).find('.ab-bar-level').text().toUpperCase());
    //     });
    //     sortClickN = false
    // }else{
    //     listitems.sort(function(b, a) {
    //         return $(a).find('.ab-bar-level').text().toUpperCase().localeCompare($(b).find('.ab-bar-level').text().toUpperCase());
    //     });
    //     sortClickN = true
    // }
    // $.each(listitems, function(index, item) {
    //     mylist.append(item);
    // });
}

const shinyElements = document.querySelectorAll('.shiny')
shinyElements.forEach(a => {
    a.addEventListener("mousemove", (e) => {
        const { x, y } = a.getBoundingClientRect();
        a.style.setProperty("--x", e.clientX - x);
        a.style.setProperty("--y", e.clientY - y);
    });
})