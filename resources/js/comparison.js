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
        }
    }
});

