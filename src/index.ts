import multiPagesParser from "./tools/MultiPagesParser";
import simpleModelParser from "./tools/SimpleModelParser";
import collectionModelParser from "./tools/CollectionModelParser";
import paginationModelParser from './tools/PaginationParser';
import { EValueType, IModelParserInfo, IParser, IRequestOptions } from "./tools/types";

/**
 * @file Wrapper typescripts classes and enums for javascript
 */

/**
 * Parse value from dom element
 */
export const EValue     = EValueType.VALUE;

/**
 * Parse text from dom element
 */
export const EText      = EValueType.TEXT;

/**
 * Parse html from dom element
 */

export const EHtml      = EValueType.HTML;

/**
 * Parse attribute from dom element
 * note: set attributeName for value parsing
 */
export const EAttribute = EValueType.ATTRIBUTE;

/**
 * Create multi page parser for many pages and one template
 *
 * @param parser Single parser for more page
 * @param onProgress callback for progress messages. Can be null
 */
export const createMultiPageParser = ( parser:IParser, onProgress?:Function ) => new multiPagesParser( parser, onProgress );

/**
 * Create simple page parser
 *
 * @param modelInfo instruction for parse html to model
 */
export const createSimpleModelParser = ( modelInfo: IModelParserInfo ) => new simpleModelParser( modelInfo );

/**
 * Create parser for page with list models
 *
 * @param collectionSelector Selector for root collection element
 * @param itemSelector Selector for sub collection element (reletive for root element)
 * @param modelInfo instruction for parsing model
 */
export const createCollectionModelParser = ( collectionSelector: string, itemSelector: string, modelInfo: IModelParserInfo ) => new collectionModelParser( collectionSelector, itemSelector, modelInfo );

/**
 * Create parser for pages with pagination
 * note: return links list for pages
 *
 * @param startUrl first page (may be relative for base site url, or absolute)
 * @param siteUrl site url with protocol (may be end with '/' ot not)
 * @param options request options (see more information on 'request')
 */
export const createPaginationModelParser = ( startUrl: string, siteUrl: string, options?:IRequestOptions ) => new paginationModelParser( startUrl, siteUrl, options );