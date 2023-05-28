if(!isBrowserOnline){stylePageOffline()}

const vs = document.querySelector('.vs');
(function (){
    const fp = document.querySelector('.fp')
    const lp = document.querySelector('.lp')
    setTimeout(() => {
        fp.classList.add('show')
    }, 50)
    setTimeout(() => {
        lp.classList.add('show')
    }, 250)
})()

fLoadServerInfos().then(async infos => {
    if (infos !== false) {
        if ('error' in infos && infos.error !== -1) {
            error_internal_server = true
            setToast('error', infos.error, 0)
            return
        }
        if (infos.max_players === -1) {
            error_internal_server = true
            setToast('error', 'Server offline', 0)
        } else {
            console.log('Online')
            error_internal_server = false;
            setServerStats(infos);

            const fLoadLeaderboard_ =  await fLoadLeaderboard()
            const fLoadTopLeaderboard_ =  await fLoadTopLeaderboard()

            if(fLoadLeaderboard_.status === 'success'){
                const data = fLoadLeaderboard_.data
                if(data !== null){
                    setSelect(data)
                    setTable(data)
                    chartComparison(data)
                    await Promise.all([
                        waitImagesLoaded(),
                        waitTableCreated()
                    ]);
                    setBest2Players()
                }
            }else{
                setToast('error', "Error loading leaderboard", 0)
            }
            if(fLoadTopLeaderboard_.status === 'success'){
                const data = fLoadTopLeaderboard_.data
                if(data !== null){
                    // console.log(data)
                }
            }else{
                setToast('error', "Error loading top leaderboard", 0)
            }

            await Promise.all([fLoadLeaderboard_, fLoadTopLeaderboard_]).then(() => {
                loading_bar.classList.add('hidden')
            }).catch((error) => {
                console.error('error : ', error);
                setToast('error', error.message, 0)
            });

        }
    }
});

function values(){
    const select_1 = document.querySelector('#s-player-1')
    const select_2 = document.querySelector('#s-player-2')
    let value_1 = select_1.value
    let value_2 = select_2.value
    return {
        'select_1': select_1,
        'select_2': select_2,
        'value_1': value_1,
        'value_2': value_2,
    }
}

function setSelect(data){
    const select = document.querySelectorAll('select')
    const len = data.players.length
    select.forEach((e, j) => {
        e.onchange = async function (a){
            setSkinCompare(data.players, len, a)
            setTable(data)
            chartComparison(data)
            await Promise.all([
                waitImagesLoaded(),
                waitTableCreated()
            ]);
            setBest2Players()
        }
        for (let i = 0; i < len; i++) {
            const option = document.createElement('option')
            option.value = data.players[i].name
            option.innerHTML = data.players[i].name
            e.appendChild(option)
        }
        e.value = (j === 0) ? data.players[0].name : data.players[1].name;
    });
    setSkinCompare(data.players, len)
}

function setSkinCompare(players, len, a = null){
    vs.style.borderBottomColor = 'var(--active-color)'
    let target
    if(a !== null) target = a.target
    const { select_1, select_2, value_1, value_2 } = values();
    let select,
        no_select,
        value,
        no_value
    let index = 0

    if(value_1 === value_2){
        for (let i = 0; i < len; i++) {
            if(target.id === 's-player-1'){
                select = select_1
                no_select = select_2
                value = value_1
                no_value = value_2
            }else{
                select = select_2
                no_select = select_1
                value = value_2
                no_value = value_1
            }

            if(select[i].value === value){
                if(i === len - 1){index = i-1}
                else{index = i+1}
                no_select.value = no_select[index].value
                value = no_select[index].value
            }
        }
        setSkinCompare(players, len, a)
        return;
    }

    // Retrieve full player data
    let playerdata_1, playerdata_2
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === value_1) {
            playerdata_1 = players[i]
        }
        if (players[i].name === value_2) {
            playerdata_2 = players[i]
        }
    }

    const img = document.querySelectorAll('.img-compare')
    const a_href = document.querySelectorAll('.a-compare')
    const img_h = document.querySelectorAll('.img-compare-head')
    img.forEach((e, i) => {
        const { value_1, value_2 } = values();
        a_href[i].querySelector('span').innerHTML = translation[languageSelect].content_page.pages.comparison.link.see_profile
        if(i === 0){
            e.src = getSkinURL(playerdata_1, 'BODY_3D')
            a_href[i].href = `user.php?q=${value_1}`
        }else{
            e.src = getSkinURL(playerdata_2, 'BODY_3D_REVERSE')
            a_href[i].href = `user.php?q=${value_2}`
        }
    })
    img_h.forEach((e, i) => {
        const { value_1, value_2 } = values();
        e.value = (i === 0) ?
            e.src = getSkinURL(playerdata_1, 'HEAD') :
            e.src = getSkinURL(playerdata_2, 'HEAD')
    })
}

function setTable(data){
    vs.style.borderBottomColor = 'var(--active-color)'
    const { value_1, value_2 } = values();
    let data_player_1,
        data_player_2
    for (let i = 0; i < data.players.length; i++) {
        if(data.players[i].name === value_1){
            data_player_1 = data.players[i]
        }else if(data.players[i].name === value_2){
            data_player_2 = data.players[i]
        }
    }

    const table = document.querySelector('.table-compare')
    while (table.firstChild) {table.removeChild(table.firstChild)}
    for (let i = 0; i < abilities.length; i++) {
        const row = document.createElement('div')
        row.classList.add('row-compare')
        const line_1 = document.createElement('div')
        line_1.classList.add('line-1')
        const line_2 = document.createElement('div')
        line_2.classList.add('line-2')
        const label_player_1 = document.createElement('div')
        const label_player_1_bg = document.createElement('div')
        const label_player_1_bg_max = document.createElement('div')
        const label_player_1_text = document.createElement('p')
        label_player_1.classList.add('label-value')
        label_player_1_text.classList.add('text_1')
        label_player_1_bg.classList.add('label-bg')
        const label_player_1_infos = document.createElement('span')
        label_player_1_infos.classList.add('label-infos')
        label_player_1_bg_max.classList.add('label-bg-max')
        const label_player_2 = document.createElement('div')
        const label_player_2_bg = document.createElement('div')
        const label_player_2_bg_max = document.createElement('div')
        const label_player_2_text = document.createElement('p')
        label_player_2_text.classList.add('text_2')
        label_player_2.classList.add('label-value')
        label_player_2_bg.classList.add('label-bg')
        label_player_2_bg_max.classList.add('label-bg-max')
        const label_player_2_infos = document.createElement('span')
        label_player_2_infos.classList.add('label-infos')
        const label_c = document.createElement('div')
        const label_c_text = document.createElement('p')
        label_c.classList.add('label-c')

        const value_1_exp = data_player_1.skills[i]
        const value_2_exp = data_player_2.skills[i]
        const max = Math.max(...data_player_1.skills, ...data_player_2.skills)
        const max_cap = abilities_cap[abilities[i]]
        row.setAttribute('data-total',
            Math.max(data_player_1.skills[i], data_player_2.skills[i]).toString()
        )

        const v_1 = value_1_exp/max*100
        const v_1_m = value_1_exp/max_cap*100
        const v_2 = value_2_exp/max*100
        const v_2_m = value_2_exp/max_cap*100
        label_player_1_bg.style.width = v_1 + '%'
        label_player_1_bg_max.style.width = v_1_m + '%'
        label_player_2_bg.style.width = v_2 + '%'
        label_player_2_bg_max.style.width = v_2_m + '%'

        label_player_1_text.innerHTML = value_1_exp
        label_player_2_text.innerHTML = value_2_exp

        if (value_1_exp > value_2_exp) {
            label_player_1_text.classList.add('max')
        } else if (value_2_exp > value_1_exp) {
            label_player_2_text.classList.add('max')
        }

        label_c_text.innerHTML = abilities[i]
        label_player_1_infos.innerHTML = translation[languageSelect].content_page.pages.comparison.explanation.in_chart
            .replace('_PERCENT_', v_1_m.toFixed(1))
            .replace('_MAX_', max_cap)
        label_player_2_infos.innerHTML = translation[languageSelect].content_page.pages.comparison.explanation.in_chart
            .replace('_PERCENT_', v_2_m.toFixed(1))
            .replace('_MAX_', max_cap)

        label_player_1.appendChild(label_player_1_bg)
        label_player_1.appendChild(label_player_1_infos)
        label_player_1.appendChild(label_player_1_bg_max)
        line_1.appendChild(label_player_1)
        line_1.appendChild(label_c)
        line_1.appendChild(label_player_2)
        // row.onclick = function (){showLine2(line_2)}
        label_c.appendChild(label_player_1_text)
        label_c.appendChild(label_c_text)
        label_c.appendChild(label_player_2_text)
        label_player_2.appendChild(label_player_2_bg)
        label_player_2.appendChild(label_player_2_infos)
        label_player_2.appendChild(label_player_2_bg_max)
        const min_screen = label_c.cloneNode(true)
        min_screen.querySelector('.text_1').innerHTML = `${value_1_exp} (${v_1_m.toFixed(1)}%)`
        min_screen.querySelector('.text_2').innerHTML = `${value_2_exp} (${v_2_m.toFixed(1)}%)`
        min_screen.classList.add('min-screen')
        row.appendChild(min_screen)
        row.appendChild(line_1)
        row.appendChild(line_2)
        // row.appendChild(label_player_2)
        table.appendChild(row)
        setTimeout(function() {
            row.classList.add('fade-in')
        }, i*100);
    }
}

function showLine2(element){
    element.classList.toggle('show')
}

function waitImagesLoaded() {
    return new Promise(resolve => {
        const images = document.querySelectorAll('img');
        let loadedImagesCount = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedImagesCount++;
            } else {
                img.addEventListener('load', () => {
                    loadedImagesCount++;

                    if (loadedImagesCount === images.length) {
                        resolve();
                    }
                });
            }
        });
        if (loadedImagesCount === images.length) {
            resolve();
        }
    });
}

function waitTableCreated() {
    return new Promise(resolve => {
        const table = document.querySelector('.table-compare');
        if (table) {
            resolve();
        }
        else {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length) {
                        const addedNode = mutation.addedNodes[0];
                        if (addedNode.tagName === 'TABLE') {
                            observer.disconnect();
                            resolve();
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    });
}

function setBest2Players(){vs.style.borderBottomColor = 'var(--w)'}

const ctx_comparison = document.getElementById('chart_comparison');

function chartComparison(data){
    const { value_1, value_2 } = values();
    let data_player_1,
        data_player_2
    for (let i = 0; i < data.players.length; i++) {
        if(data.players[i].name === value_1){
            data_player_1 = data.players[i]
        }else if(data.players[i].name === value_2){
            data_player_2 = data.players[i]
        }
    }
    let tp = []
    tp.push(data_player_1, data_player_2)
    let datasets = []
    for (let i = 0; i < tp.length; i++) {
        datasets.push(
            {
                label : tp[i].name,
                data : function (){
                    return tp[i].skills
                }(),
                backgroundColor: generateColors(7, i)
            }
        )
    }
    let data_conf = {
        labels: Object.values(translation[languageSelect].ab),
        datasets: datasets,
        borderWidth: 2,
    }
    let config = {
        type: 'radar',
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
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            maintainAspectRatio: false
        },
    };
    let ch = Chart.getChart('chart_comparison');
    if (ch) {
        ch.destroy();
    }

    let c = new Chart(ctx_comparison, config);
    c.update();
}