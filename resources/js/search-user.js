const s = document.querySelector('.result-search')
let nb_player = 0

fLoadServerInfos().then(infos => {
    if(infos !== false){
        if(infos.max_players === -1){
            //Offline
            error_internal_server = true;
        }else{
            //Online
            error_internal_server = false;
            (async() => {
                try {
                    const response = await fetch(requestLeaderboard)
                    const leaderboard = await response.json()
                    if(leaderboard !== false){
                        setCard(leaderboard)
                    }
                } catch (error) {
                    console.error(error)
                }
            })();
            (async() => {
                try {
                    const response = await fetch(requestTopLeaderboard)
                    const leaderboard = await response.json()
                    if(leaderboard !== false){
                        setCardBP(leaderboard)
                    }
                } catch (error) {
                    console.error(error)
                }
            })();
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
        const player = users[i].name

        img.src = `https://mc-heads.net/head/${player}`
        name.innerHTML = player

        clone.href = `user.html?q=${player}`
        clone.setAttribute('data-total', users[i].total)

        s.appendChild(clone)
    }
    const shinyElements = document.querySelectorAll('.shiny')
    shinyElements.forEach(a => {
        a.addEventListener("mousemove", (e) => {
            const { x, y } = a.getBoundingClientRect();
            a.style.setProperty("--x", e.clientX - x);
            a.style.setProperty("--y", e.clientY - y);
        });
    })
}

function setCardBP(players){
    const users = players.players
    for (let i = 0; i < s.childElementCount; i++) {
        if(s.children[i].classList.contains('user-find')){
            const name = s.children[i].querySelector('.name').innerHTML
            for (let j = 0; j < users.length; j++) {
                if(name === users[j].name){
                    s.children[i].querySelector('.rank').classList.remove('hidden')
                    s.children[i].querySelector('.medal').innerHTML = (j+1).toString()
                    s.children[i].setAttribute('data-rank', (j+1).toString())
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

let sortClickA = false
let sortClickN = false

function sortAlphabetical_s(){
    var mylist = $('.result-search')
    const icon = $('.sort_A')[0]
    var listitems = mylist.children('a').get()

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
function sortNumber_s(){
    var mylist = $('.result-search')
    const icon = $('.sort_N')[0]
    var listitems = mylist.children('a').get()

    if(!sortClickN){
        listitems.sort(function(a, b) {
            return +a.dataset.total - +b.dataset.total
        });
        sortClickN = true
        icon.classList.replace('fa-arrow-down-1-9', 'fa-arrow-down-9-1')
    }else{
        listitems.sort(function(b, a) {
            return +a.dataset.total - +b.dataset.total
        });
        sortClickN = false
        icon.classList.replace('fa-arrow-down-9-1', 'fa-arrow-down-1-9')
    }
    $.each(listitems, function(index, item) {
        mylist.append(item);
    });
}