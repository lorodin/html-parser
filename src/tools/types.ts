import {IRequestOptions} from "./PageLoader";
import {IModelParserResult} from "./Parser";

/**
 * Parser interface
 */
export interface IParser {
    parse: ( url: string|string[], options?:IRequestOptions ) => Promise<IModelParserResult[]>
}