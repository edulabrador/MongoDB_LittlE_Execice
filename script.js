
// -----------------------------------------------------------------------------

db.investingProducts.deleteMany({});
db.assets.deleteMany({});

// -----------------------------------------------------------------------------

db.investingProducts.insertOne({
    _id: "stakingFixed",
    date: { started: "07/01/2022", closed: "07/05/2022" }, yield: 12, duration: 60, 
    assets: [ "etherium", "polkadot", "cardano" ]
});
db.investingProducts.insertOne({
    _id: "stakingVariable",
    date: { started: "24/05/2022", closed: "07/08/2022" }, yield: 8, duration: 5,
    assets: [ "etherium", "polkadot", "chainlink" ]
});
db.investingProducts.insertOne({
    _id: "lendingFixed",
    date: { started: "03/08/2022", closed: "16/11/2022" }, yield: 5, duration: 30,
    assets: [ "usdc", "dai", "bitcoin" ]
});
db.investingProducts.insertOne({
    _id: "lendingVariable",
    date: { started: "03/03/2022", closed: "01/12/2023" }, yield: 3, duration: 2,
    assets: [ "usdc", "etherium", "bitcoin", "matic" ]
});
db.investingProducts.insertOne({
    _id: "crytoGambling",
    date: { started: "01/01/2021", closed: "31/12/2023" }, yield: 100, duration: 1
});
db.investingProducts.insertMany(
    [
        {
            _id: "dualFarming",
            date: { started: "03/01/2022", closed: "19/08/2022" }, yield: 53, duration: 7,
            assets: [ "polkadot", "etherium", "chainlink", "matic" ]
        },
        {
            _id: "stableStaking",
            date: { started: "17/02/2022", closed: "31/12/2023" }, yield: 21, duration: 15,
            assets: [ "usdc", "dai" ]
        }
    ]
);

db.assets.insertOne({
    _id: "bitcoin",
    name: { complete: "Bitcoin", shorted: "BTC" },
    futureInterest: 1, rating: 1,
    investingProducts: [ "lendingVariable", "lendingFixed" ],
    active: "yes", blockchain: [ "BTC", "BNB", "ETH" ], price: 16500
});
db.assets.insertOne({
    _id: "etherium",
    name: { complete: "Etherium", shorted: "ETH" },
    futureInterest: 1, rating: 2,
    investingProducts: [ "stakingFixed", "stakingVariable", "lendingVariable", "" ],
    active: "yes", blockchain: [ "MATIC", "BNB", "ETH" ], price: 1200
});
db.assets.insertOne({
    _id: "polkadot",
    name: { complete: "Polkadot", shorted: "DOT" },
    futureInterest: 3, rating: 4,
    investingProducts: [ "stakingFixed", "stakingVariable", "dualFarming" ],
    active: "yes", blockchain: [ "DOT", "BNB", "ETH" ], price: 5
});
db.assets.insertOne({
    _id: "cardano",
    name: { complete: "Cardano", shorted: "ADA" },
    futureInterest: 2, rating: 10,
    investingProducts: [ "stakingFixed" ],
    active: "no", blockchain: [ "ADA", "MATIC", "ETH" ], price: 1
});
db.assets.insertOne({
    _id: "usdc",
    name: { complete: "Usdc", shorted: "Usdc" },
    futureInterest: 0, rating: 5,
    investingProducts: [ "lendingFixed", "lendingVariable", "stableStaking" ],
    active: "yes", blockchain: [ "MATIC", "BNB", "ETH" ], price: 1,
    backed: [
        { type: "Dollar", porcentage: 100 }
    ]
});
db.assets.insertOne({
    _id: "chainlink",
    name: { complete: "Chainlink", shorted: "Link" },
    futureInterest: 4, rating: 7,
    investingProducts: [ "stakingVariable", "dualFarming" ],
    active: "yes", blockchain: [ "MATIC", "BNB", "ETH", "KuCoin", "Luna" ], price: 4
});
db.assets.insertMany(
    [
        {
            _id: "matic",
            name: { complete: "Poligon", shorted: "Matic" },
            futureInterest: 0, rating: 3,
            investingProducts: [ "lendingVariable", "dualFarming" ],
            active: "yes", blockchain: [ "MATIC", "BNB", "ETH" ], price: 1
        },
        {
            _id: "dai",
            name: { complete: "DAI", shorted: "DAI" },
            futureInterest: 1, rating: 30,
            investingProducts: [ "lendingFixed", "stableStaking" ],
            active: "yes", blockchain: [ "MATIC", "BNB", "ETH", "KuCoin" ], price: 1,
            backed: [
                { type: "Usdc", porcentage: 78 },
                { type: "ETH", porcentage: 22 }
    ]
           
        }
    ]
);

// -----------------------------------------------------------------------------

db.assets.replaceOne(
    { "name.complete": "Avax", rating: { $eq: 2 } },
    {
        _id: "avax",
        name: { complete: "Avax", shorted: "AVAX" },
        futureInterest: 1, rating: 2,
        investingProducts: [ "lendingVariable", "dualFarming" ],
        active: "yes", blockchain: [ "MATIC", "BNB", "ETH", "AVAX" ], price: 12
    },
    { upsert: true }
);

db.assets.replaceOne(
    { "name.complete": "Chainlink", "name.shorted": "Link" },
    { 
        _id: "chainlink",
        name: { complete: "Chainlink", shorted: "Link" },
        futureInterest: 2, rating: 4,
        investingProducts: [ "stakingVariable", "dualFarming" ],
        active: "no", blockchain: [ "MATIC", "BNB", "ETH" ], price: 5
    }
);

// -----------------------------------------------------------------------------

db.assets.updateOne(
    { _id: "bitcoin" } ,
    {
        $addToSet:{ blockchain: "AVAX" } 
    }
);
db.assets.updateOne(
    { _id: "tradingBot", yield: {$eq: 10} },
    {
        $set:{
        yield: 12, duration: 60, 
        assets: [ "etherium", "dai", "bitcoin" ]
        }
    },
    { upsert: true }
);
db.assets.updateMany(
    { futureInterest: {$lte: 4}} ,
    {
        $set: { active: "yes" },
        $inc:{ futureInterest:4 }
    }
);

// -----------------------------------------------------------------------------
//Queries

//1º I want to check out good coins (ratings been 1 the best) with a low price
// so I can buy with a low budget. I need it to sort it by blockchains so I know
// which wallet i should use
db.assets.find(
    { 
        $and: [
            {price: {$lt: 100}},
            {rating: {$lte: 5}}
        ] 
    },
    { _id: 1 }
).sort( { blockchain: 1 } );
//2º I want to look for investing products, I filter between safe products with 
// no more than 30 days of duration or riskier ones with les than 10 days of 
// duration but with a minimum of a 20% yield
db.investingProducts.find(
    { 
        $or: [
            { $and: [
                {yield: {$lte: 15}},
                {duration: {$lte: 30}}
            ] },
            { $and: [
                {yield: {$gt: 20}},
                {duration: {$lt: 10}}
            ] }
        ] 
    },
    { _id: 1, assets: {  $slice: -2 } }
);
//3º I want to find all the names of the assets with no more than a 2% intest rate
// and with the rating been no more than 12 (ratings been 1 the best). Also I am 
// looking for a coin that is not in etherium's blockchain and it is not unactive
db.assets.find(
    { 
        blockchain:  {$not: {$eq: "ETH"}} , active: {$not: {$eq: "no"}},
        futureInterest: {$not: {$gt: "2"}}, rating: {$not: {$gt: "12"}}
    },
    { _id: 0, "name.complete": 1 }
);
//4º I want to look for a coin that is usable in BNB and ETH blockchain, so I can take my coins 
// out of the exchange, I need the blockchain, also having the names and if is active (for been 
// able to withdraw it from the exchange)
db.assets.find(
    { 
        blockchain: { $elemMatch: { $eq: "BNB", $eq: "ETH" } }
    },
    { _id: 0,"name.complete": 1, blockchain: 1, actvie: 1 }
);

//5º I am looking to find a investing product that gives more than a 4% return in stablecoin 
// (safer option because it doesn't fluctuate, it is nearly a risk free investment)
db.investingProducts.find(
    { 
         $and: [
                {yield: {$gte: 4}},
                {
                    $or: [
                        {assets: {$eq: "usdc"}},
                        {assets: {$eq: "dai"}}
                    ]
                }                
            ] 
    },
    { _id: 1, assets: 1 }
);

// -----------------------------------------------------------------------------
//Map reduce
// I want to find a list of investingProducts wich have a yield higher than 2%
db.investingProducts.mapReduce(
    function() {
        emit(this._id, this.yield);
    },
    function(key, values) {
        return values.sort();
    },
    {
        query: { yield: { $gt: 2 } },
        out: { inline: 1 }
    }
);
