export const sortPriceFromLow = (products) => {
    function compare( a, b ) {
        if ( parseInt(a.price) < parseInt(b.price) ){
          return -1;
        }
        if ( parseInt(a.price) > parseInt(b.price) ){
          return 1;
        }
        return 0;
    }

    return products.sort( compare );
}

export const sortPriceFromHigh = (products) => {
    function compare( a, b ) {
        if ( parseInt(a.price) < parseInt(b.price) ){
          return 1;
        }
        if ( parseInt(a.price) > parseInt(b.price) ){
          return -1;
        }
        return 0;
    }

    return products.sort( compare );
}