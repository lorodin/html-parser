import multiPagesParser from "./tools/MultiPagesParser";
import simpleModelParser from "./tools/SimpleModelParser";
import collectionModelParser from "./tools/CollectionModelParser";
import paginationModelParser from './tools/PaginationParser';
import { EValueType, IModelParserInfo, IParser, IRequestOptions } from "./tools/types";

export const EValue     = EValueType.VALUE;
export const EText      = EValueType.TEXT;
export const EHtml      = EValueType.HTML;
export const EAttribute = EValueType.ATTRIBUTE;

export const createMultiPageParser = ( parser:IParser, onProgress?:Function ) => new multiPagesParser( parser, onProgress );
export const createSimpleModelParser = ( modelInfo: IModelParserInfo ) => new simpleModelParser( modelInfo );
export const createCollectionModelParser = ( collectionSelector: string, itemSelector: string, modelInfo: IModelParserInfo ) => new collectionModelParser( collectionSelector, itemSelector, modelInfo );
export const createPaginationModelParser = ( startUrl: string, siteUrl: string, options?:IRequestOptions ) => new paginationModelParser( startUrl, siteUrl, options );