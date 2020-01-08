import { EValueType, IModelParserInfo } from "./tools/Parser";
import CollectionModelParser from "./tools/CollectionModelParser";
import { PaginationParser } from "./tools/PaginationParser";
import MultiPagesParser from "./tools/MultiPagesParser";

(async () => {
    const pageParser = new PaginationParser( "catalog/bedroom/", "https://meb-elite.ru", { timout: 100 } );

    const links = await pageParser.getPageUrls(".catalog_bottom_pagenav .nums.i_block", "a.num", {
        selector: "",
        type: EValueType.ATTRIBUTE,
        attributeName: "href"
    }, (num) => console.log('Loaded ', num ));

    let bad = links.find( l => l.indexOf('javascript') !== -1 );
    let index = links.indexOf( bad );
    links.splice( index, 1 );
    const nlinks = links.map( l => 'https://meb-elite.ru' + l );

    const modelInfo:IModelParserInfo = {
        'title': {
            selector: '.item_content a span[itemprop="name"]',
            type: EValueType.TEXT
        },
        'price': {
            selector: '.item_content .item_props span.price',
            type: EValueType.TEXT
        },
        'link': {
            selector: '.item_content a.link',
            type: EValueType.ATTRIBUTE,
            attributeName: 'href'
        }
    };

    const collectionSelector = "ul.items.i_block_container";
    const itemSelector = "li.item.i_block";
    const collectionModelParser = new CollectionModelParser( collectionSelector, itemSelector, modelInfo );

    const parser = new MultiPagesParser( collectionModelParser, ( i, l ) => console.log( `${ i }/${ l }` ) );

    const result = await parser.parse( nlinks, { timout: 100 } );

    console.log( result );
    console.log( result.length );
})();