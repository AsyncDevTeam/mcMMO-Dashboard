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
            error_internal_server = false;
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            server_logo.src = infos.icon
            link.href = infos.icon

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
                    setCardBP(data)
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
        const player = users[i].name

        img.src = `https://mc-heads.net/head/${player}`
        name.innerHTML = player

        clone.href = `user.php?q=${player}`
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