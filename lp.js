
lpTag.sdes = lpTag.sdes || [];
lpTag.identities = [];
function identityFn(callback) {
    callback({
        iss: "rajesh",
        acr: "loa1",
        sub: "12192996"
    });
}


lpTag.sdes.push({
    "type": "cart",
    "total": 1099,
    "currency": "USD",
    "numItems": "1",
    "products": [{
        "product": {
            "name": "Title : Shop Online",
            "category": " ",
            "price": " "
        }
    }]
})
lpTag.identities.push(identityFn);









