/*
Sort option 
1: LIFO  
2: FIFO
3: A-Z
4: Z-A
*/

const paginate = (arrPage, itemPerPage, page, sortOption) => {
    switch (sortOption) {
        case 1:
            arrPage = arrPage.sort((a, b) => {
                return (a.updatedAt > b.updatedAt) ? -1 : ((a.updatedAt < b.updatedAt) ? 1 : 0);
            });
            break;
        case 2:
            arrPage = arrPage.sort((a, b) => {
                return (a.updatedAt < b.updatedAt) ? -1 : ((a.updatedAt > b.updatedAt) ? 1 : 0)
            });
            break;
        case 3:
            arrPage = arrPage.sort((a, b) => {
                return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)
            });
            break;
        case 4:
            arrPage = arrPage.sort((a, b) => {
                return (a.name > b.name) ? -1 : ((a.name < b.name) ? 1 : 0)
            });
            break;
        default:
            return arrPage;
    }

    let paginated = [];
    if (itemPerPage === null && page === null) {
        paginated = arrPage;
    } else {
        if (page < 1 || !page) page = 1;
        for (let i = (page - 1) * itemPerPage; i < arrPage.length && i < (page * itemPerPage); i++) {
            paginated.push(arrPage[i]);
        }
    }
    return paginated;
}

export default paginate;