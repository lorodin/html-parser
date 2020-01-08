import PageLoader from "./PageLoader";
import {
    IModelParserInfo,
    IModelParserResult,
    IParser,
    IRequestOptions } from "./types";
import parseModel from "./custom";

/**
 * Simple page parser
 */
export default class SimpleModelParser implements IParser
{
    /**
     * @param modelInfo information about model
     */
    constructor( private modelInfo: IModelParserInfo )
    {
    }

    /**
     * Create simple model from page
     * @param url page url
     * @param options request options
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