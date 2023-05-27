const s = document.querySelector('.result-search')
let nb_player = 0


fLoadServerInfos().then(async infos => {
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
            setServerStats(infos);
            error_internal_server = false;

            const fLoadLeaderboard_ =  await fLoadLeaderboard()
            const fLoadTopLeaderboard_ =  await fLoadTopLeaderboard()

            if(fLoadLeaderboard_.status === 'success'){
                const data = fLoadLeaderboard_.data
                if(data !== null){
                    setCard(data)
                }
            }
            if(fLoadTopLeaderboard_.status === 'success'){
                const data = fLoadTopLeaderboard_.data
                if(data !== null){
                    setCardBP(
                        data.players.filter((element, index) => {
                            return index < 4;
                        })
                    )
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

function setCard(players){
    const users = players.players
    const card = s.querySelector('.user-find')
    nb_player = users.length
    for (let i = 0; i < nb_player; i++) {
        const clone = card.cloneNode(true);
        clone.setAttribute('data-clone', 'o')
        const name = clone.querySelector('.name')
        const img = clone.querySelector('img')
        const total = clone.querySelector('.total')
        const player = users[i].name
        total.innerText = `${users[i].total} exp`
        img.src = getSkinURL(users[i], 'HEAD_3D')
        name.innerHTML = player
        clone.href = `user.php?q=${player}`
        clone.setAttribute('data-total', users[i].total)
        s.appendChild(clone)
        setTimeout(function() {
            clone.classList.add('fade-in')
        }, i*100);
    }
}

function setCardBP(users){
    for (let i = 0; i < s.childElementCount; i++) {
        if(s.children[i].classList.contains('user-find')){
            const name = s.children[i].querySelector('.name').innerHTML
            for (let j = 0; j < users.length; j++) {
                const label_name = s.children[i].querySelector('.name')
                const name_player = label_name.innerHTML
                if(name === users[j].name){
                    label_name.classList.add(`label-${j+1}`)
                    label_name.innerHTML = `#${j+1} ${name_player}`
                    s.children[i].setAttribute('data-rank', (j+1).toString())
                    // s.children[i].querySelector('.rank').classList.remove('hidden')
                    // s.children[i].querySelector('.medal').innerHTML = (j+1).toString()
                }
            }
        }
    }
}

const input = document.querySelector('#sb-u')
const no_element_found = document.querySelector(".no-element-found")
input.addEventListener('keyup', function (){
    let filter = input.value.toUpperCase();
    let counterStyle = 0
    for (let i = 0; i < s.childElementCount; i++) {
        if(s.children[i].classList.contains('user-find')){
            let object = s.children[i]
            let a = object.querySelector('.name').innerHTML
            if (a.toUpperCase().indexOf(filter) > -1) {
                s.children[i].style.display = 'flex'
                counterStyle = 0
            } else {
                s.children[i].style.display = 'none'
                counterStyle++
            }
        }
    }
    if(counterStyle - 1 === nb_player){
        no_element_found.classList.remove('hidden')
    }else{
        no_element_found.classList.add('hidden')
    }
})