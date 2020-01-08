const parsers = require('./dist');

const modelInfo = {
    'title': {
        selector: '.item_content a span[itemprop="name"]',
        type: parsers.EText
    },
    'price': {
        selector: '.item_content .item_props span.price',
        type: parsers.EText
    },
    'link': {
        selector: '.item_content a.link',
        type: parsers.EAttribute,
        attributeName: 'href'
    }
};

const collectionParser = parsers.createCollectionModelParser( "ul.items.i_block_container",
                                                              "li.item.i_block",
                                                              modelInfo );

collectionParser.parse( "https://meb-elite.ru/catalog/bedroom/" )
                .then( res => {
                    console.log( res );
                });