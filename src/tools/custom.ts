import * as cheerio from 'cheerio';
import { EValueType, IModelParserInfo, IModelParserResult } from "./types";

/**
 * Парсит html в простую модель данных
 * @param body HTML страницы
 * @param modelInfo Информация о моделе
 */
export default function parseModel( body: string, modelInfo: IModelParserInfo ): IModelParserResult
{
    let result:IModelParserResult = {};
    const $ = cheerio.load( body );
    for ( let key in modelInfo )
    {
        result[key] = null;

        const selector = $( 'html' ).find( modelInfo[key].selector );

        if ( selector && selector.first() )
        {
            result[key] = getValue( selector.first(), modelInfo[key].type, modelInfo[key].attributeName );
        }
    }

    return result;
}

/**
 * Парсит коллекцию со страницы
 * @param body html страницы
 * @param collectionSelector селектор для всей коллекции
 * @param itemSelector селектор для одного элемента (относительно селектора для всей коллекции)
 * @param modelInfo информация о моделе
 */
export function parseCollection( body: string,
                                 collectionSelector: string,
                                 itemSelector: string,
                                 modelInfo:IModelParserInfo )
    : IModelParserResult[]
{
    const result:IModelParserResult[] = [];

    const $ = cheerio.load( body );

    const items = $( collectionSelector ).find( itemSelector );

    for ( let i = 0; i < items.length; i++ )
    {
        let item = {};

        for ( let key in modelInfo )
        {
            if ( modelInfo[key].selector )
            {
                item[key] = getValue( $(items[i]).find( modelInfo[key].selector ),
                    modelInfo[key].type,
                    modelInfo[key].attributeName );
            }
            else
            {
                item[key] = getValue( $(items[i]),
                    modelInfo[key].type,
                    modelInfo[key].attributeName );
            }
        }

        result.push( item );
    }

    return result;
}

/**
 * Вытаскивает нужное значение из DOM-элемента
 * @param node DOM элемент (cheerio)
 * @param type
 * @param attributeName
 */
function getValue( node, type: EValueType, attributeName?: string )
{
    switch ( type ) {
        case EValueType.TEXT:       return node.text();
        case EValueType.VALUE:      return node.val();
        case EValueType.ATTRIBUTE:  return node.attr( attributeName );
        case EValueType.HTML:       return node.html();
    }
}

/**
 * Соединяет относительные url адреса в абсолютный
 * todo: Доделать, может быть несколько граничных слешей
 * @param urls
 */
export function joinUrls( ...urls )
{
    let url = '';

    for ( let i = 0; i < urls.length; i++ )
    {
        if ( !urls[i] ) continue;

        let curl = urls[i];

        if ( curl.startsWith( '/' ) && url !== '' )
        {
            curl = curl.substr( 1, curl.length - 1 );
        }

        if ( !curl.endsWith( '/' ) && i !== urls.length - 1 )
        {
            curl += '/';
        }

        url += curl;
    }
    return url;
}