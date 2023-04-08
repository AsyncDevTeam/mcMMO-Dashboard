fLoadLeaderboard().then(r => {
    if(r.status === 'success'){
        const data = r.data
        if(data !== null){
            setTopCards(data)
        }
    }
})

function setTopCards(data){
    const label_1_tc = document.querySelectorAll('.exp-all-label')
    let players = data.players
    let totalScore = 0;
    for (let i = 0; i < players.length; i++) {
        totalScore += players[i].total;
    }
    label_1_tc.forEach(e => {
        if(totalScore){
            e.innerHTML = `${totalScore} cumulative exp`
            e.closest('.exp-all').classList.add('on')
        }
    })
}

function doABarrelRoll(){
    document.body.classList.add('do-a-barrel-roll')
    setTimeout(() => {
        document.body.classList.remove('do-a-barrel-roll')
    }, 2050)
}