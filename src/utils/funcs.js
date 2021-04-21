export const filterGenres = (allGenres, currentGenres) => {
    const filteredArr = allGenres.filter(item => currentGenres.includes(item.id));
    return filteredArr;
}


export const paginationArray = total => {
    const arr = [];
    for(let i = 1; i <= total; i++){
        arr.push(i);
    }

    return arr;
}