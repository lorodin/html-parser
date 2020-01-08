
/**
 * Результат запроса
 */
export interface IPageResponse {
    /**
     * URL-адрес страницы, куда был отправлен запрос
     */
    url: string,

    /**
     * cheerio.load
     * @param selector
     */
    body: string
}

/**
 * Опции для запроса
 */
export interface IRequestOptions {
    /**
     * Кодировка
     */
    encoding?:string;

    /**
     * Задержка между запросами в миллисекудах, по умолчанию 500мс
     */
    timout?: number;

    /**
     * Кэшировать результаты страниц или нет
     */
    cached?:boolean;
}

/**
 * Формат данных, которые нужно использовать в качестве итогового значения
 */
export enum EValueType
{
    VALUE,
    TEXT,
    ATTRIBUTE,
    HTML
}

/**
 * Информация о элементе DOM
 */
export interface ISelectorInfo {
    selector?: string;
    type: EValueType;
    attributeName?:string;
}

/**
 * Информация о моделе
 */
export interface IModelParserInfo {
    [prop:string]: ISelectorInfo;
}

/**
 * Результат парсинга
 */
export interface IModelParserResult {
    [prop:string]: string;
}
/**
 * Parser interface
 */
export interface IParser {
    parse: ( url: string|string[], options?:IRequestOptions ) => Promise<IModelParserResult[]>
}