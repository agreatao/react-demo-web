// min 117.158612 38.579124
// max 118.055371 39.330314

export function getRandomLon(min, max) {
    return Math.random() * (max - min + 1) + min;
}

export function getRandomLat(min, max) {
    return Math.random() * (max - min + 1) + min;
}
