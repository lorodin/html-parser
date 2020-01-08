import PageLoader, { IRequestOptions } from "./PageLoader";
import parseModel, {IModelParserInfo, IModelParserResult} from "./Parser";
import {IParser} from "./types";

/**
 * Парсер для простой плоской модели данных
 */
export default class SimpleModelParser implements IParser
{
    /**
     * Конструктор
     * @param modelInfo
     */
    constructor( private modelInfo: IModelParserInfo )
    {
    }

    /**
     * Строит плоскую модель, без рекурсии
     * @param url
     * @param options
     */
    public async parse( url: string, options?:IRequestOptions ):Promise<IModelParserResult[]>
    {
        return new Promise( async ( res ) => {
            const pageLoader = new PageLoader( [url], options );
            const resp = await pageLoader.run();
            res( [parseModel( resp[0].body, this.modelInfo )] );
        });
    }
}