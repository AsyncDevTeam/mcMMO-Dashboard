if(!isBrowserOnline){stylePageOffline()}
fLoadServerInfos().then(async infos => {
    if (infos !== false) {
        if ('error' in infos && infos.error !== -1) {
            error_internal_server = true
            setToast('error', infos.error, 0)
            return
        }
        if (infos.max_players === -1) {
            error_internal_server = true
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
                }
            }
            if(fLoadTopLeaderboard_.status === 'success'){
                const data = fLoadTopLeaderboard_.data
                if(data !== null){
                    // console.log(data)
                }
            }

            await Promise.all([fLoadLeaderboard_, fLoadTopLeaderboard_]).then(() => {
                loading_bar.classList.add('hidden')
            }).catch((error) => {
                console.error('error : ', error);
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
        e.onchange = function (a){
            setSkinCompare(len, a)
            setTable(data)
        }
        for (let i = 0; i < len; i++) {
            const option = document.createElement('option')
            option.value = data.players[i].name
            option.innerHTML = data.players[i].name
            e.appendChild(option)
        }
        e.value = (j === 0) ? data.players[0].name : data.players[1].name;
    });
    setSkinCompare(len)
}

function setSkinCompare(len, a = null){
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
    }
    const img = document.querySelectorAll('.img-compare')
    const img_h = document.querySelectorAll('.img-compare-head')
    img.forEach((e, i) => {
        const { select_1, select_2, value_1, value_2 } = values();
        e.value = (i === 0) ?
            e.src = `https://mc-heads.net/body/${value_1}` :
            e.src = `https://mc-heads.net/body/${value_2}/left`
    })
    img_h.forEach((e, i) => {
        const { select_1, select_2, value_1, value_2 } = values();
        e.value = (i === 0) ?
            e.src = `https://mc-heads.net/avatar/${value_1}` :
            e.src = `https://mc-heads.net/avatar/${value_2}/left`
    })
}

function setTable(data){
    const { select_1, select_2, value_1, value_2 } = values();
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
        const label_player_1 = document.createElement('div')
        const label_player_1_bg = document.createElement('div')
        const label_player_1_bg_max = document.createElement('div')
        const label_player_1_text = document.createElement('p')
        label_player_1.classList.add('label-value')
        label_player_1_bg.classList.add('label-bg')
        label_player_1_bg_max.classList.add('label-bg-max')
        const label_player_2 = document.createElement('div')
        const label_player_2_bg = document.createElement('div')
        const label_player_2_bg_max = document.createElement('div')
        const label_player_2_text = document.createElement('p')
        label_player_2.classList.add('label-value')
        label_player_2_bg.classList.add('label-bg')
        label_player_2_bg_max.classList.add('label-bg-max')
        const label_c = document.createElement('div')
        const label_c_text = document.createElement('p')
        label_c.classList.add('label-c')

        const value_1 = data_player_1.skills[i]
        const value_2 = data_player_2.skills[i]
        const max = Math.max(...data_player_1.skills, ...data_player_2.skills)
        const max_cap = abilities_cap[abilities[i]]
        row.setAttribute('data-total',
            Math.max(data_player_1.skills[i], data_player_2.skills[i]).toString()
        )

        label_player_1_bg.style.width = value_1/max*100 + '%'
        label_player_1_bg_max.style.width = value_1/max_cap*100 + '%'
        label_player_2_bg.style.width = value_2/max*100 + '%'
        label_player_2_bg_max.style.width = value_2/max_cap*100 + '%'

        label_player_1_text.innerHTML = value_1
        label_player_2_text.innerHTML = value_2
        label_c_text.innerHTML = abilities[i]

        // label_player_1.appendChild(label_player_1_text)
        label_player_1.appendChild(label_player_1_bg)
        label_player_1.appendChild(label_player_1_bg_max)
        row.appendChild(label_player_1)
        label_c.appendChild(label_player_1_text)
        label_c.appendChild(label_c_text)
        label_c.appendChild(label_player_2_text)
        row.appendChild(label_c)
        // label_player_2.appendChild(label_player_2_text)
        label_player_2.appendChild(label_player_2_bg)
        label_player_2.appendChild(label_player_2_bg_max)
        row.appendChild(label_player_2)
        table.appendChild(row)
        setTimeout(function() {
            row.classList.add('fade-in')
        }, i*100);
    }
}