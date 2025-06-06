const icon = document.querySelector('.hamburger-menu .icon')
const last_refresh_bp = document.getElementById('last_refresh_bp')
if(!isBrowserOnline){stylePageOffline()}
let initComplete_leaderboard
let datasetChartAbilities = []
let bp_name = []
fLoadServerInfos().then(async infos => {
    if (infos !== false) {
        if ('error' in infos && infos.error !== -1) {
            setToast('error', infos.error, 0)
            return
        }
        if (infos.max_players === -1) {
            dataBaseError()
            setToast('error', 'Server offline', 0)
        } else {
            setServerStats(infos);

            let fLoadLeaderboard_
            const storageType = settings.localStorage ? localStorage : sessionStorage;
            const fLoadLeaderboard_storage = JSON.parse(storageType.getItem('fLoadLeaderboard'));
            if (fLoadLeaderboard_storage !== null && checkUnixTimestamp(fLoadLeaderboard_storage.expiration)) {
                fLoadLeaderboard_ = await fLoadLeaderboard();
            } else {
                fLoadLeaderboard_ = fLoadLeaderboard_storage ?? await fLoadLeaderboard();
            }

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
                    last_refresh_bp.innerText = translation[languageSelect].refresh.index.replace('_HOUR_', getHM())
                    addBP(data)
                    bp_name = data.players.filter((element, index) => {
                        return index < 4;
                    })
                }else{
                    setToast('error', 'No top Leaderboard', 0)
                }
            }else{
                setToast('error', "Error loading top leaderboard", 0)
            }

            await Promise.all([fLoadLeaderboard_, fLoadTopLeaderboard_]).then((r) => {
                for (let i = 0; i < r.length; i++) {
                    if(r[i].from === 'fLoadLeaderboard' && r[i].status === 'success'){
                        const data = r[i].data
                        if(data !== null){
                            quickViewSetup(data)
                            databaseLoad(data)
                            //loadDatasetChartAbilities(data)
                            chartAbilities(data)
                            // chartAbilitiesMinMax(data)
                            // chartEachAbilities(data)
                            chartBestAbilities(data)
                        }else{
                            setToast('error', 'No Leaderboard', 0)
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

function dataBaseError(){
    const overlay_stats = document.querySelectorAll('.overlay-stats')
    const p_stats = document.querySelectorAll('.stats-server p:not(.sc-h-1-s)')
    const li = document.querySelectorAll('.collapsible.content.index-page li')
    const lic = document.querySelectorAll('.collapsible.content.index-page li')
    const collapsible = document.querySelector('.collapsible.content.index-page');

    classModifier(overlay_stats, 'hidden', 'r')

    classModifier(li, 'disable', 'a')
    classModifier(lic, 'disable', 'a')
    classModifier(p_stats, 'hidden', 'a')

    const instance = M.Collapsible.getInstance(collapsible);
    instance.close();
    iconModifier(collapsible, true)
}

function loadDatasetChartAbilities(player){
    const user = player.players
    let dataset = []
    let color
    for (let i = 0; i < user.length; i++) {
        if(user[i] !== undefined){
            color = generateColors(0, i+1)[0]
            if(color === '')
                color = generateColors(0, i)[0]
            dataset.push(
                {
                    label : user[i].name,
                    data : function (){
                        return user[i].skills
                    }(),
                    hidden: false,
                    backgroundColor: hexToRGBA(color),
                    borderColor: color
                }
            )
        }
    }
    datasetChartAbilities.push(dataset)
}

function quickViewSetup(player){
    let array = [], rank = []
    array.push(...player.players.map(o => o.total))
    const order = array.sort(function(a, b){return a - b}).reverse()
    const max_total = Math.max(...player.players.map(o => o.total))

    player.players.forEach(e => {
        rank.push({
            'total' : e.total,
            'name'  : e.name,
            'uuid'  : e.uuid,
            'bedrock'  : e.bedrock,
            'rank'  : order.indexOf(e.total) + 1,
        })
        if(e.total === max_total){}
    })
    sessionStorage.setItem('rank_player', JSON.stringify(rank))
}

function setQuickViewPlayer(username){
    const selected_player = document.querySelectorAll('.selected-player-name')
    const sel_rank_user = document.querySelectorAll('.sel_rank_user')
    const sel_current_rank = document.querySelectorAll('.sel_current_rank')
    const seeSkill = document.querySelectorAll('.seeSkill')

    const array = JSON.parse(sessionStorage.getItem('rank_player'))

    array.forEach(e => {
        if(e.name === username){
            sel_rank_user.forEach(a => {
                a.innerHTML = `${e.rank}/${array.length}`
            })
            sel_current_rank.forEach(a => {
                a.innerHTML = e.total
            })
        }
    })
    let name, skinurl
    for (let i = 0; i < bp_name.length; i++) {
        if(bp_name[i].name === username){
            name =`<span class='label-${i+1}'>#${i+1} ${bp_name[i].name}</span>`
            skinurl = getSkin(bp_name[i], 'HEAD').url
            break
        } else {
            let user
            for (let j = 0; j < array.length; j++) {
                if (array[j].name === username) {
                    user = array[j]
                }
            }
            name = username
            skinurl = getSkin(user, 'HEAD').url
        }
    }

    selected_player.forEach(e => {
        e.innerHTML = `<img class="img" src="${skinurl}" alt="player_heads">` + name
    })

    seeSkill.forEach(e => {
        e.onclick = function (){window.open(`user.php?q=${username}`,"_self")}
    })
}

/*
let chart_select_filter
chart_select.addEventListener('change', function (){
    chart_select_filter = chart_select.value
    updateGraph(chart_select_filter)
})
*/

function updateGraph(value){
    let duplicate = []
    let current
    if(datasetChartAbilities[0].length < value){
        current = datasetChartAbilities[0].length
    }else{
        current = value
    }
    for (let i = 0; i < current; i++) {
        duplicate[i] = datasetChartAbilities[0][i]
    }
    chartAbilitiesGraph.data.datasets = duplicate
    chartAbilitiesGraph.update()
}

const ctx = document.getElementById('myChart');
const ctx_pi = document.getElementById('myChart-abi-pie');

let chartAbilitiesGraph,
    chartBestAbilitiesGraph

function chartAbilities(data){

    const maxLevel = Math.max(...data.players.map(player => player.total));
    const intervalSize = maxLevel < 100 ? 1 : Math.ceil(maxLevel / 100);
    const numIntervals = Math.ceil(maxLevel / intervalSize);
    const playerCounts = new Array(numIntervals).fill(0);

    data.players.forEach(player => {
        const intervalIndex = Math.min(Math.floor(player.total / intervalSize), numIntervals - 1);
        playerCounts[intervalIndex]++;
    });

    const labels = Array.from({length: numIntervals}, (_, i) => i * intervalSize);
    const filteredPlayerCounts = [];
    const filteredLabels = [];

    for (let i = 0; i < playerCounts.length; i++) {
        if (playerCounts[i] !== 0) {
            filteredPlayerCounts.push(playerCounts[i]);
            filteredLabels.push(labels[i]);
        }
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    chartAbilitiesGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: filteredLabels,
            datasets: [{
                label: translation[languageSelect].content_page.general.chart_players_title,
                data: filteredPlayerCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
                tension: 0.5,
                fill: false,
                pointRadius: 1,
                pointHitRadius: 100,
                pointLabels: { display: true }
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return translation[languageSelect].content_page.general.chart_point_desc.replace('_PLAYERS_', context.parsed.y);
                        },
                        title: function(context) {
                            const labelIndex = filteredLabels.indexOf(parseInt(context[0].label));
                            if (filteredLabels[labelIndex + 1] !== undefined) {
                                return filteredLabels[labelIndex] + "-" + filteredLabels[labelIndex + 1];
                            } else {
                                return filteredLabels[labelIndex];
                            }
                        }
                    }
                }
            },
            legend: {
                display: false
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: translation[languageSelect].content_page.general.chart_players_level_x
                    }
                },
                y: {
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: translation[languageSelect].content_page.general.chart_players_count_y
                    },
                    beginAtZero: true
                }
            },
        }
    });
}

function done(){
    const image = chartAbilitiesGraph.toBase64Image()
    // console.log(image);
}

function chartBestAbilities(player){
    const user = player.players
    let a = []
    for (let i = 0; i < user.length; i++) {
        let u = []
        abilities.forEach(e => {
            let ab = []
            ab.push(user[i][e], e)
            u.push(ab)
        })
        a.push({'name': user[i].name, u})
    }

    let all = []
    abilities.forEach(ab => {
        let z = []
        user.forEach(user => {
            z.push(user[ab])
        })
        all.push({ab, z})
    })

    const sumA = []
    const labelA = [],
        labelA_init = []
    all.forEach(e => {
        const r = e.z.reduce((partialSum, a) => partialSum + a, 0)
        e['sum'] = r
        sumA.push(r)
        labelA.push(translation[languageSelect].ab[e.ab])
        labelA_init.push(e.ab)
    })

    let best_ab_all = []
    for (let i = 0; i < sumA.length; i++) {
        best_ab_all.push([sumA[i], labelA_init[i]])
    }

    best_ab_all.sort(sortFunction).reverse()
    createTableBestAbilities(best_ab_all)

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    const data = {
        labels: labelA,
        datasets: [
            {
                label: 'EXP',
                data: sumA,
                backgroundColor: generateColors(7)
            }
        ]
    }
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            maintainAspectRatio: false,
        },
    }
    chartBestAbilitiesGraph = new Chart(ctx_pi, config)
}

function createTableBestAbilities(data){
    const labels = [
        translation[languageSelect].ab_labels.sum,
        translation[languageSelect].ab_labels.ab
    ]
    const container = document.querySelector('.array-infos-ba')

    const tr_h = document.createElement('tr')
    tr_h.classList.add('header-table')
    for (let i = 0; i < 2; i++) {
        const td = document.createElement('td')
        td.innerHTML = labels[i]
        tr_h.appendChild(td)
        container.appendChild(tr_h)
    }

    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr')
        tr.classList.add('row-table')
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td')
            if(j === 2){
                const link_td = document.createElement('a')
                link_td.classList.add('def-skill-link', 'btn-link')

                if (window.matchMedia("(max-width: 750px)").matches) {
                    const icon = document.createElement('i')
                    icon.classList.add('fa-solid', 'fa-arrow-up-right-from-square')
                    link_td.appendChild(icon)
                }else{
                    link_td.innerHTML = translation[languageSelect].recommendation.link
                }
                link_td.href = `https://mcmmo.fandom.com/wiki/${data[i][1]}`
                td.classList.add('link-table')
                td.appendChild(link_td)
            }else{
                td.innerHTML = data[i][j]

                if(typeof data[i][j] === 'string'){
                    td.innerHTML = translation[languageSelect].ab[data[i][j]]
                }
            }
            tr.appendChild(td)
        }
        container.appendChild(tr)
    }
}

function databaseLoad(player){
    let name
    for (let i = 0; i < player.players.length; i++) {
        const user = player.players[i]
        for (let j = 0; j < bp_name.length; j++) {
            if(bp_name[j].name === user.name){
                name = `<span class='label-${j+1}'>#${j+1} ${user.name}</span>`
                break
            } else {
                name = user.name
            }
        }
        user.name_img = `<img class="img" data-user="${user.name}"  data-type="default" src="resources/others/textures/defaultSkin/bedrock-head.png" alt="player_heads">` + name
    }

    let lengthChangeAllow = true
    let pagingAllow = true
    if(player.players.length < 10){
        lengthChangeAllow = false
        pagingAllow = false
    }

    let username
    let leaderboard_table = $('#leaderboard_table').DataTable({
        data: player.players,
        columns: [
            // { data: 'name'},
            { data: 'name_img'},
            { data: 'total' },
            { data: 'taming' },
            { data: 'mining' },
            { data: 'woodcutting' },
            { data: 'repair' },
            { data: 'unarmed' },
            { data: 'herbalism' },
            { data: 'excavation' },
            { data: 'archery' },
            { data: 'swords' },
            { data: 'axes'},
            { data: 'acrobatics' },
            { data: 'fishing' },
            { data: 'alchemy' },
            { data: 'crossbows' },
            { data: 'tridents' },
            { data: 'maces' },
        ],
        lengthMenu: [
            [10, 25, 50],
            [10, 25, 50],
        ],
        order: [[1, 'desc']],
        scrollX: "300px",
        "paging": pagingAllow,
        "lengthChange": lengthChangeAllow,
        "searching": true,
        "ordering": true,
        "info": pagingAllow,
        "autoWidth": false,
        "responsive": false,
        "language": translation[languageSelect].dataTable,
        "initComplete": function() {
            initComplete_leaderboard = true
            changeImageTable(player.players, this[0].querySelector('tbody'))
        }
    });

    $('#leaderboard_table tbody').on('click', 'tr', function () {

        username = $(this)[0].querySelectorAll('td')[0].innerText

        if($(this).hasClass('child')) return

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('.selected-player').removeClass('show');

            if (window.matchMedia("(max-width: 1300px)").matches) {
                icon.classList.remove('hidden')
            }
        } else {
            leaderboard_table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('.selected-player').addClass('show');

            if (window.matchMedia("(max-width: 1300px)").matches) {
                icon.classList.add('hidden')
            }
        }

        if(!$(this).attr('class').includes('child')){
            if (window.matchMedia("(max-width: 1300px)").matches) {
                icon.classList.toggle('hidden')
            }

            setQuickViewPlayer(username.replace(/^#\d+\s/, ""))
        }
    });

    $('.player_research').on('keyup change keypress', function () {
        setTimeout(() => {
            leaderboard_table.search(this.value).draw()
            searchInChart(this.value)
        }, 100)
    } );
    $('#leaderboard_table_length').on('change', function (){
        changeImageTable(player.players, $('#leaderboard_table').find('tbody')[0])
    })
    $('#leaderboard_table_paginate').on('click', function (){
        changeImageTable(player.players, $('#leaderboard_table').find('tbody')[0])
    })
    $('.row_table_def').on('click', function (){
        changeImageTable(player.players, $('#leaderboard_table').find('tbody')[0])
    })
}
function chartEachAbilities(player){
    let ab = []
    const players = player.players
    players.forEach(e => {
        ab.push(e.skills[0])
        for (let i = 0; i < abilities.length; i++) {
            // ab.push(e.skills[0])
        }
    })
}

function addBP(player){
    const content_bp = document.querySelector('.content_bp');

    const createColAndCards = (start, end, container) => {
        const col = document.createElement('div');
        col.className = 'col';
        for (let i = start; i < end; i++) {
            if (player.players[i]) {
                const el = createCard(player.players[i], i + 1);
                col.appendChild(el);
            }
        }
        container.appendChild(col);
    };

    const playerCount = player.players.length;

    if (playerCount >= 2) {
        createColAndCards(0, 2, content_bp);
        if (playerCount >= 4) {
            createColAndCards(2, 4, content_bp);
        } else {
            createColAndCards(2, playerCount, content_bp);
        }
    } else {
        createColAndCards(0, playerCount, content_bp);
    }

    function createCard(player, rank = null){
        const string = player.name
        const total = player.total

        const container = createElement('a', 'btn-main')
        container.classList.add(`rank-${rank}`)
        const img = createElement('img', 'img')
        const rank_img = createElement('img', 'rank_img')

        const wrapper = createElement('div', 'wrapper_a')
        const label = createElement('span', 'label')
        label.classList.add(`label-${rank}`)
        const total_v = createElement('span', 'tot')

        if(rank !== null){
            img.src = getSkin(player, 'HEAD').url
            label.innerText = '#' + rank + ' ' + string
            total_v.innerText = 'Lvl : ' + total
            container.href = `user.php?q=${string}`
            switch (rank){
                case 1:
                    rank_img.src = 'resources/others/textures/pack/388-0.png'
                    break
                case 2:
                    rank_img.src = 'resources/others/textures/pack/264-0.png'
                    break
                case 3:
                    rank_img.src = 'resources/others/textures/pack/266-0.png'
                    break
                case 4:
                    rank_img.src = 'resources/others/textures/pack/265-0.png'
                    break
            }
            container.appendChild(img)
            wrapper.appendChild(label)
            wrapper.appendChild(total_v)
            container.appendChild(wrapper)
            container.appendChild(rank_img)
        }

        return container
    }
}

function searchInChart(inputValue) {
    let filter = inputValue.toUpperCase();
    for (let i = 0; i < chartAbilitiesGraph.data.datasets.length; i++) {
        let object = chartAbilitiesGraph.data.datasets[i]
        let a = object.label;
        if (a.toUpperCase().indexOf(filter) > -1) {
            object.borderDash = [0, 0]
            object.borderWidth = 2
        } else {
            object.borderDash = [5, 5]
            object.borderWidth = 1
        }
    }
    chartAbilitiesGraph.update()
}

let scrollable_leaderboard = setInterval(() => {
    if(initComplete_leaderboard){
        clearInterval(scrollable_leaderboard)
        const ele = document.querySelector('#leaderboard_table_wrapper .dataTables_scrollBody');
        let pos = { top: 0, left: 0, x: 0, y: 0 };
        const mouseDownHandler = function (e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        };

        ele.addEventListener('mousedown', mouseDownHandler)
    }
}, 500)
