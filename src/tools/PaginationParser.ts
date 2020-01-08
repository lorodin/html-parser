import CollectionModelParser from "./CollectionModelParser";
import { joinUrls } from "./custom";
import { IRequestOptions, ISelectorInfo } from "./types";

/**
 * Парсит URL страниц со страницы с паджинацией
 */
export default class PaginationParser {
    private currentPage: string;
    private readonly siteUrl?: string;
    private readonly options?:IRequestOptions;
    private cachedLinks: string[] = [];

    constructor( startUrl: string,
                 siteURL?:string,
                 options?:IRequestOptions )
    {
        this.options = options;
        this.siteUrl = siteURL;
        this.currentPage = joinUrls( siteURL, startUrl );
        this.cachedLinks.push( joinUrls('/', startUrl) );
    }

    /**
     * Парсит страницу и возвращает все url страниц
     * @param paginationSelector Селектор для родительского DOM всей паджинации
     * @param pageSelector Селектор для ссылки на одну страницу
     * @param linkInfo Информация для парсинга DOM в url страницы
     * @param onProgress Колбэк для отслеживания процесса парсинга
     */
    public async getPageUrls( paginationSelector: string,
                              pageSelector: string,
                              linkInfo:ISelectorInfo,
                              onProgress?:Function ): Promise<string[]>
    {
        return new Promise( async res => {
            do {
                const collectionParser = new CollectionModelParser( paginationSelector, pageSelector, { 'link': linkInfo } );
                const resp = await collectionParser.parse( this.currentPage, this.options);
                if ( resp.length === 0 ) break;
                if ( this.cachedLinks.indexOf( resp[resp.length - 1].link ) !== -1 ) break;

                resp.forEach( r => {
                    if ( this.cachedLinks.indexOf( r.link ) === -1 )
                    {
                        this.cachedLinks.push( r.link )
                    }
                });

                this.currentPage = joinUrls( this.siteUrl, this.cachedLinks[this.cachedLinks.length - 1] );

                if ( onProgress ) onProgress( this.cachedLinks.length );
            } while( true );
            res( this.cachedLinks );
        });
    }
}