import PageLoader, { IRequestOptions } from "./PageLoader";
import { IModelParserResult } from "./Parser";
import { IParser } from "./types";

export default class MultiPagesParser implements IParser {

    constructor( private parser:IParser, private onProgress?:Function ) { }

    public async parse( urls: string[], options?:IRequestOptions ):Promise<IModelParserResult[]>
    {
        return new Promise<IModelParserResult[]>( async res => {
            const pageLoader = new PageLoader( urls, { cached: true, ...( options || {} ) }  );
            await pageLoader.run( this.onProgress );
            let result:IModelParserResult[] = [];

            await Promise.all( urls.map( url => new Promise( async res => {
                const models = await this.parser.parse( url, options );
                result = result.concat( models );
                res();
            })));

            res( result );
        });
    }
}