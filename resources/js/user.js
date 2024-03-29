const query = window.location.search.split("?q=")[1]
const title_section = document.querySelector('.title-section')
const input = document.querySelector('#filter_group')
const no_element_found = document.querySelector(".no-element-found")
const filter_group = document.getElementById("filter-group")
let label_player = {}
let oneTimeAnimationSkinLoad = false
if(!isBrowserOnline){stylePageOffline()}
animation_toggle.addEventListener('change', (e) => {
    const storageType_ = settings.localStorage ? localStorage : sessionStorage;
    const getPlayerData = JSON.parse(storageType_.getItem(`fLoadUser_${query}`));
    const player = getPlayerData.data
    const drop_animation = document.querySelector('.drop-3')
    drop_animation.innerHTML = translation[languageSelect].content_page.dropdown_menu["drop-3"].replace(
        "__STATE__",
        e.target.checked ? "ON" : "OFF"
    )

    const {type, last_update, url} = getSkin(player, 'SKIN')
    if(e.target.checked){
        //dynamic
        if(!oneTimeAnimationSkinLoad){
            if(!settings.animated_skins){
                oneTimeAnimationSkinLoad = true
                setSkin(player, url, true)
            }
        }
        document.getElementById("img-skin-user-3d").style.display = "flex";
        document.getElementById("img-skin-user").style.display = "none";
    }else{
        //static
        if(settings.animated_skins){
            const img = document.querySelector('#img-skin-user')
            img.src = getSkin(player, 'BODY_3D').url
        }
        document.getElementById("img-skin-user-3d").style.display = "none";
        document.getElementById("img-skin-user").style.display = "flex";
    }
})
const container_best_ab = document.querySelector('.f-best-ab')
container_best_ab.onscroll = function (){
    const children = Array.from(container_best_ab.children)
    const filteredElements = children.filter(element => element.classList.contains('shiny'))
    const tolerance = 20; // Tolerance value in pixels
    function getVisibleChildElements() {
        const containerRect = container_best_ab.getBoundingClientRect();
        const children = Array.from(container_best_ab.children);

        return children.filter(child => {
            const childRect = child.getBoundingClientRect();
            return childRect.left >= containerRect.left - tolerance &&
                childRect.right <= containerRect.right + tolerance;
        });
    }
    const index = filteredElements.indexOf(
        getVisibleChildElements()[0]
    );
    if(index !== -1){setScrollIndicators(index)}
}
const setScrollIndicators = function (index){
    const container = document.querySelector('.scroll-indicator-f-best-ab')
    const children = Array.from(container.children)
    children.forEach(e => {e.classList.remove('active')})
    children[index].classList.add('active')
}
const createScrollIndicators = function (len){
    const container = document.querySelector('.scroll-indicator-f-best-ab')
    for (let i = 0; i < len; i++) {
        const node = document.createElement('div')
        node.classList.add('dot')
        if(i === 0)
            node.classList.add('active')
        node.setAttribute('data-index', i.toString())
        node.onclick = function (){goToScrollElement(this)}
        container.appendChild(node)
    }
}
const goToScrollElement = function(e){
    const index = e.dataset.index
    const children = Array.from(container_best_ab.children);
    const s = children[index].getBoundingClientRect()
    const offset_left = children[0].getBoundingClientRect().left
    container_best_ab.scrollTo({
        left: (s.width*index) + offset_left,
        behavior: 'smooth'
    })
}

if(query !== undefined && isBrowserOnline){
    document.title = translation[languageSelect].pages_name[exact_type].replace(
        '_USER_', query.toString()
    )
}else{
    setToast('error', "No player found", 0)
}

let best_player = ""
let bp_name = []
fLoadServerInfos().then(async infos => {
    if(infos !== false){
        if('error' in infos && infos.error !== -1) {
            setToast('error', infos.error, 0)
            return
        }
        if(infos.max_players === -1){
            setToast('error', 'Server offline', 0)
        }else{
            setServerStats(infos);
            let fLoadTopLeaderboard_
            const storageType_TopLdb = settings.localStorage ? localStorage : sessionStorage;
            const fLoadTopLeaderboard_storage = JSON.parse(storageType_TopLdb.getItem('fLoadTopLeaderboard'));
            if (fLoadTopLeaderboard_storage !== null && checkUnixTimestamp(fLoadTopLeaderboard_storage.expiration)) {
                fLoadTopLeaderboard_ = await fLoadTopLeaderboard();
            } else {
                fLoadTopLeaderboard_ = fLoadTopLeaderboard_storage ?? await fLoadTopLeaderboard();
            }
            if(fLoadTopLeaderboard_.status === 'success'){
                const data = fLoadTopLeaderboard_.data
                if(data !== null){
                    best_player = data.players[0]
                    bp_name = data.players.filter((element, index) => {
                        return index < 4;
                    })
                    for (let i = 0; i < bp_name.length; i++) {
                        if(bp_name[i].name === query.toString()){
                            name =`<span class='label-${i+1}'>#${i+1} ${bp_name[i].name}</span>`
                            break
                        }else{
                            name = query.toString()
                        }
                    }
                    title_section.innerHTML = name

                    if(best_player.name === query.toString()){
                        setToast('info', translation[languageSelect].content_page.toast.best_player, 7000)
                        errorCompareChart()
                    }
                }
            }else{
                setToast('error', "Error loading top leaderboard", 0)
            }

            let fLoadLeaderboard_
            const storageType = settings.localStorage ? localStorage : sessionStorage;
            const fLoadLeaderboard_storage = JSON.parse(storageType.getItem('fLoadLeaderboard'));
            if (fLoadLeaderboard_storage !== null && checkUnixTimestamp(fLoadLeaderboard_storage.expiration)) {
                fLoadLeaderboard_ = await fLoadLeaderboard();
            } else {
                fLoadLeaderboard_ = fLoadLeaderboard_storage ?? await fLoadLeaderboard();
            }

            await Promise.all([fLoadLeaderboard_, fLoadTopLeaderboard_]).then((r) => {
                for (let i = 0; i < r.length; i++) {
                    if(r[i].from === 'fLoadLeaderboard' && r[i].status === 'success'){
                        const data = r[i].data
                        if(data !== null){
                            let result_bp = data.players.find(item => item.name === best_player.name);
                            let result_cp = data.players.find(item => item.name === query.toString());
                            labelGet(data)
                            chartCompare(result_bp, result_cp)
                        }else{
                            setToast('error', "Error loading top leaderboard", 0)
                        }
                    }
                }
                loading_bar.classList.add('hidden')
            }).catch((error) => {
                console.error('error : ', error);
                setToast('error', error.message, 0)
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

(async function loadUser(){
    let fLoadUser_
    const storageType_user = settings.localStorage ? localStorage : sessionStorage;
    const label_store = `fLoadUser_${query}`
    const fLoadUser_storage = JSON.parse(storageType_user.getItem(label_store));
    if (fLoadUser_storage !== null && checkUnixTimestamp(fLoadUser_storage.expiration)) {
        fLoadUser_ = await fLoadUser();
    } else {
        fLoadUser_ = fLoadUser_storage ?? await fLoadUser();
    }
    if(fLoadUser_.status === 'success'){
        const data = fLoadUser_.data
        if(data !== null){
            if(!isBrowserOnline) return
            const {type, last_update, url} = getSkin(data, 'SKIN')
            setSkin(data, url)
            setBestAbilities(data)
            setAllAbilities(data)
            setFilterFamilyCard()
            userData(data, type, last_update)
            // CalcFamilies(r)
            setChart(data)
        }
    }
}());

const CalcFamilies = function (data){
    const familyExpSums = {};
    for (const family in families) {
        const skills = families[family];
        let expSum = 0;

        for (let i = 0; i < skills.length; i++) {
            const skill = skills[i].toLowerCase();
            if (skill in data) {
                const exp = data[skill].exp;
                expSum += exp;
            }
        }
        familyExpSums[family] = expSum;
    }
}

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
                }(),
                borderColor : generateColors(0, i+1)[0],
                backgroundColor : hexToRGBA(generateColors(0, i+1)[0])
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
            },
            maintainAspectRatio: false
        },
    };

    chartCompareGraph = new Chart(ctx_compare, config);
}

function setLabel(player){
    const stackParent = document.querySelector(".labels");
    if(Object.keys(label_player).length !== 0){
        const labels = getKeyByValue(label_player, player)
        if(labels.length !== 0){
            createLabel(labels, stackParent)
        }else{
            stackParent.classList.add('hidden')
        }
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] === value);
}

function createLabel(array, stackParent){
    for (let i = 0; i < array.length; i++) {
        const node = document.querySelector(".label-user");
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

function userData(player, type, last_update){
    const last_connection_user = document.querySelector('.last-connection-user')
    const skin_update = document.querySelector('.skin-update')
    const last_connection = player.last_connection
    let date = getHM(last_connection)
    last_connection_user.innerHTML = translation[languageSelect].refresh.user
        .replace('_HOUR_', date.h)
        .replace('_MIN_', date.m)
        .replace('_DATE_', date.date);
    function formatTimestamp(timestamp) {
        const d = new Date(timestamp);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let hour = d.getHours();
        let minute = d.getMinutes();

        day = (day < 10 ? '0' : '') + day;
        month = (month < 10 ? '0' : '') + month;
        year = (year < 10 ? '0' : '') + year;
        hour = (hour < 10 ? '0' : '') + hour;
        minute = (minute < 10 ? '0' : '') + minute;
        let date = day + '/' + month + '/' + year

        return {hour, minute, date}
    }

    if(type === 'bedrock'){
        const {hour, minute, date} = formatTimestamp(last_update)
        skin_update.innerHTML = translation[languageSelect].refresh.skin
            .replace('_HOUR_', hour)
            .replace('_MIN_', minute)
            .replace('_DATE_', date);
    }else{
        skin_update.classList.add('hidden')
    }

}
function setSkin(player, url, force = false) {
    if (settings.animated_skins || force) {
        document.getElementById("img-skin-user").style.display = "none";

        let skinViewer = new skinview3d.SkinViewer({
            canvas: document.getElementById("img-skin-user-3d"),
            width: 300,
            height: 400,
        });
        skinViewer.loadSkin(url, {
            model: "auto-detect",
            ears: false
        });

        skinViewer.zoom = 0.8;
        skinViewer.controls.enableZoom = false;
        skinViewer.autoRotate = true;
        skinViewer.autoRotateSpeed = 0.1;

        let animType = Math.floor(Math.random() * 3);
        switch (animType) {
            case 0:
                skinViewer.animation = new skinview3d.WalkingAnimation();
                skinViewer.animation.speed = Math.random() * 0.4 + 0.4;
                break;
            case 1:
                skinViewer.animation = new skinview3d.RunningAnimation();
                skinViewer.animation.speed = Math.random() * 0.4 + 0.4;
                break;
            default:
                skinViewer.animation = new skinview3d.IdleAnimation();
                skinViewer.animation.speed = 2;
        }
    } else {
        document.getElementById("img-skin-user-3d").style.display = "none";
        const img = document.querySelector('#img-skin-user')
        img.src = getSkin(player, 'BODY_3D').url
    }
}

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
    ab_title.innerHTML = translation[translation.active].content_page.general.table_total_label
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

    b.best4Ab.forEach((value, i) => {
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
        setTimeout(function() {
            clone.classList.add('fade-in')
        }, i*100);
        clone.addEventListener("mousemove", (e) => {
            const { x, y } = clone.getBoundingClientRect();
            clone.style.setProperty("--x", e.clientX - x);
            clone.style.setProperty("--y", e.clientY - y);
        });
    })
    createScrollIndicators(b.best4Ab.length)
}

function setAllAbilities(player){

    const node = document.querySelector(".ab-card")
    const stack = document.querySelector(".card-abilities")

    const b = getBestAbility(player)

    abilities.forEach(e => {
        const clone = node.cloneNode(true);
        clone.setAttribute('data-clone', 'o')
        clone.classList.add('shiny')
        clone.style.display = 'block'

        const ab_title = clone.querySelector('.ab-title')
        ab_title.innerHTML = translation[languageSelect].ab[e]
        ab_title.setAttribute('data-ab', e)

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

        // console.log(player)

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

        clone.setAttribute('data-total', lvl)
        const family_label = clone.querySelector('.family-label')
        for (const [index, family] of Object.keys(families).entries()) {
            if (families[family].includes(e.charAt(0).toUpperCase() + e.slice(1))) {
                clone.setAttribute('data-family', translation[translation.active].family[family])
                family_label.setAttribute('data-family', `var(--f${index})`)
                family_label.innerHTML = translation[translation.active].family[family]
                break;
            }
        }

        const exp_test = Math.floor(Math.random() * (3000 - 500 + 1)) + 500;

        const ab_ar_label = clone.querySelector('.ab-bar-label')
        const ab_ar_label_max = clone.querySelector('.ab-bar-label-max')
        ab_ar_label.innerHTML = `${exp}`
        // ab_ar_label.innerHTML = `${exp}`
        ab_ar_label_max.innerHTML = `${next_level}`
        const ab_ar_level = clone.querySelector('.ab-bar-level')
        ab_ar_level.innerHTML = translation[languageSelect].card.card_level_avt
            .replace('_CURRENT_LVL_', lvl)

        const ab_bar = clone.querySelector('.ab-bar')
        const ab_next_level = clone.querySelector('.ab-next-level')
        let percent = (exp_test > next_level) ? 100 : Math.floor(((next_level - exp_test)/next_level)*100)
        let exp_left = (exp_test > next_level) ? 0 : next_level - exp_test
        ab_bar.style.width = percent + "%"
        ab_next_level.innerHTML = translation[languageSelect].card.card_level_next_avt
            .replace('_EXP_PERCENT_', (100 - percent).toString())
            .replace('_EXP_LEFT_', (next_level - exp_test).toString())
            // .replace('_EXP_LEFT_', (exp_left).toString())

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
searchAbility.addEventListener('click', () => {
    filter_group.classList.remove("show")
    input.checked = false
})

searchAbility.addEventListener('keyup', () => {
    const list = changeFilterGroup()
    const card_infos = document.querySelector('.card-infos')
    const cards = document.querySelectorAll('.ab-card')
    let inputValue = searchAbility.value
    let filter = inputValue.toUpperCase();
    let counterStyle = 0

    for (let i = 0; i < list.length; i++) {
        let object = list[i].querySelector('.ab-title')
        let a = object.innerHTML;
        if (a.toUpperCase().indexOf(filter) > -1) {
            list[i].style.display = 'block'
            counterStyle = 0
        } else {
            list[i].style.display = 'none'
            counterStyle++
        }
    }

    if(counterStyle === list.length){
        //No element found
        no_element_found.classList.remove('hidden')
    }else{
        no_element_found.classList.add('hidden')
    }

    card_infos.classList.add('hidden')
    cards.forEach(e => {
        if(e.classList.contains('selected')){
            e.classList.remove('selected')
        }
    })
})

function clearInputUser(){
    const list = changeFilterGroup()
    const res = document.querySelector('#ab_research')
    res.value = ""

    for (let i = 0; i < list.length; i++) {
        list[i].style.display = 'block'
    }
    no_element_found.classList.add('hidden')
}

function setChart(player){
    let dataset = []
    let skill_array = []
    abilities.forEach(e => {
        skill_array.push(player[e].lvl)
    })

    dataset.push(
        {
            label : 'All Abilities (exp)',
            data : skill_array,
            hidden: false,
            backgroundColor: generateColors(7)
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
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {display: false}
            }
        }
    };

    const chart_user_all_abilities = document.getElementById('chart_user_all_abilities');
    new Chart(chart_user_all_abilities, config);
}

const shinyElements = document.querySelectorAll('.shiny')
shinyElements.forEach(a => {
    a.addEventListener("mousemove", (e) => {
        const { x, y } = a.getBoundingClientRect();
        a.style.setProperty("--x", e.clientX - x);
        a.style.setProperty("--y", e.clientY - y);
    });
})

function setFilterFamilyCard(){
    for (const [index, family] of Object.keys(families).entries()) {
        const element = document.createElement('div')
        const label = document.createElement('label')
        const span = document.createElement('span')
        const input = document.createElement('input')
        input.setAttribute("type", "checkbox");
        input.id = `select-${index}`
        input.checked = true
        label.setAttribute("for", `select-${index}`);

        element.classList.add('filter')
        span.setAttribute('data-family', `var(--f${index})`)
        element.setAttribute('data-family', `var(--f${index})`)
        span.innerHTML = translation[translation.active].family[family]

        label.appendChild(span)
        element.appendChild(input)
        element.appendChild(label)
        // label.onclick = changeFilterGroup
        input.onchange = function (){changeFilterGroup();searchAbility.value = ""}
        filter_group.appendChild(element)
    }
}
function dropdownGroup(){
    if(input.checked){
        filter_group.classList.remove("show")
    }else{
        filter_group.classList.add("show")
    }
}
function changeFilterGroup(){
    const card = document.querySelectorAll('.ab-card[data-clone="o"]')
    const filter = document.querySelectorAll('.filter')
    let fam = []
    filter.forEach(e => {
        const input = e.querySelector('input')
        if(input.checked){
            const span = e.querySelector('span')
            fam.push(span.innerHTML)
        }
    })

    let ar = []
    let counterStyle = 0
    card.forEach(a => {
        if(fam.includes(a.dataset.family)){
            a.style.display = 'block'
            ar.push(a)
            counterStyle = 0
        }else{
            a.style.display = 'none'
            counterStyle++
        }
    })
    if(counterStyle === abilities.length){
        //No element found
        no_element_found.classList.remove('hidden')
    }else{
        no_element_found.classList.add('hidden')
    }

    const card_infos = document.querySelector('.card-infos')
    card_infos.classList.add('hidden')
    const cards = document.querySelectorAll('.ab-card')
    cards.forEach(e => {
        if(e.classList.contains('selected')){
            e.classList.remove('selected')
        }
    })

    return ar
}
