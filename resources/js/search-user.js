const container = document.querySelector('.result-search')
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
            if (fLoadTopLeaderboard_storage !== null && checkUnixTimestamp(fLoadTopLeaderboard_storage.time)) {
                fLoadTopLeaderboard_ = await fLoadTopLeaderboard();
            } else {
                fLoadTopLeaderboard_ = fLoadTopLeaderboard_storage ?? await fLoadTopLeaderboard();
            }
            if(fLoadTopLeaderboard_.status === 'success'){
                const data = fLoadTopLeaderboard_.data
                if(data !== null){
                    bp_name = data.players.filter((element, index) => {
                        return index < 4;
                    })
                }
            }else{
                setToast('error', 'No top Leaderboard', 0)
            }

            let fLoadLeaderboard_
            const storageType = settings.localStorage ? localStorage : sessionStorage;
            const fLoadLeaderboard_storage = JSON.parse(storageType.getItem('fLoadLeaderboard'));
            if (fLoadLeaderboard_storage !== null && checkUnixTimestamp(fLoadLeaderboard_storage.time)) {
                fLoadLeaderboard_ = await fLoadLeaderboard();
            } else {
                fLoadLeaderboard_ = fLoadLeaderboard_storage ?? await fLoadLeaderboard();
            }

            await Promise.all([fLoadLeaderboard_, fLoadTopLeaderboard_]).then((r) => {
                for (let i = 0; i < r.length; i++) {
                    if (r[i].from === 'fLoadLeaderboard' && r[i].status === 'success') {
                        const data = r[i].data
                        if (data !== null) {
                            tableLoad(data)
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
function tableLoad(player){
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
    let sp_table = $('#sp-table').DataTable({
        data: player.players,
        columns: [
            { data: 'name_img'},
            { data: 'total' },
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
            changeImageTable(player.players, this[0].querySelector('tbody'))
        }
    });
    $('#sp-table tbody tr').on('click', function () {
        window.open(`user.php?q=${this.querySelector('img').dataset.user}`, '_self')
    })
    $('#sp-table_length').on('change', function (){
        changeImageTable(player.players, $('#sp-table').find('tbody')[0])
    })
    $('#sp-table_filter input').on('keyup', function (){
        changeImageTable(player.players, $('#sp-table').find('tbody')[0])
    })
    $('#sp-table_paginate').on('click', function (){
        changeImageTable(player.players, $('#sp-table').find('tbody')[0])
    })
    $('.row_table_def').on('click', function (){
        changeImageTable(player.players, $('#sp-table').find('tbody')[0])
    })
}
