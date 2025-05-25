const balklistedTokens = new Set();

export function addBlacklistToken(token) {

    balklistedTokens.add(token);


}

export function isTokenBlacklisted(token) {

    return balklistedTokens.has(token);
}