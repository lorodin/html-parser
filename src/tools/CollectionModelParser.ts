import PageLoader, { IRequestOptions } from "./PageLoader";
import { IModelParserInfo, IModelParserResult, parseCollection } from "./Parser";
import { IParser } from "./types";

/**
 * Парсит страницы со списками в массив моделей
 */
export default class CollectionModelParser implements IParser
{
    constructor( private collectionSelector: string, private itemSelector: string, private modelInfo: IModelParserInfo) { }

    /**
     * Преобразует содержимое страниц в массив
     *
     * @param url
     * @param options
     */
    public async parse( url: string, options?:IRequestOptions ): Promise<IModelParserResult[]>
    {
        return new Promise( async ( res ) => {
            const pageLoader = new PageLoader([url], options );
            const resp = await pageLoader.run();
            res( parseCollection( resp[0].body, this.collectionSelector, this.itemSelector, this.modelInfo ) );
        })
    }
}