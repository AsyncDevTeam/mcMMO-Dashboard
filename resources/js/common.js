// Common set of functions

function getSkinURL(player, type) {
    let types = {
        'BODY':             'player',
        'BODY_3D':          'body',
        'BODY_3D_REVERSE':  'body',
        'HEAD':             'avatar',
        'HEAD_3D':          'head'
    };
    if (!types[type]) {
        throw new Error(`Invalid type "${type}". Type must be one of ${Object.keys(types).join(', ')}.`);
    }
    if (player.bedrock === 0) {
        // Bedrock players not allowed, so we can directly use mc-heads API
        return 'https://mc-heads.net/' + types[type] + '/' + player.name + (type === 'BODY_3D_REVERSE' ? '/left' : '');
    } else {
        // Bedrock players are allowed, so we should use Tydium API
        return 'https://api.tydiumcraft.net/v1/players/skin?uuid=' + player.uuid + '&type=' + (type === 'BODY_3D_REVERSE' ? '&direction=left' : '');
    }
}