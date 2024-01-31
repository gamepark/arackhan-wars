const query = new URLSearchParams(window.location.search)
export const isDeckbuilding = query.get('mode') === 'deckbuilding'