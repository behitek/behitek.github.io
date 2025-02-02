// API configuration for Clash of Clans
export const API_CONFIG = {
    BASE_URL: 'https://coc-apis.behitek.com',
    CLAN_TAG: '%232G9YRCRV2',
    endpoints: {
        currentWar: '/clans/{tag}/currentwar',
        clanInfo: '/clans/{tag}',
        warLeague: 'clans/{tag}/currentwar/leaguegroup'
    }
};

// Helper function to format endpoints with clan tag
export const getEndpoint = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint.replace('{tag}', API_CONFIG.CLAN_TAG)}`;
};