import * as request from 'request';
import { IRequestOptions } from "./types";


/**
 * Элемент очереди запросов
 */
interface IRequestQueueItem {
    url: string,
    callback: ( err?: any, body?: any ) => void;
}

/**
 * Кэш страниц
 */
interface IPageCache {
    [url: string]: string;
}

/**
 * Универсальный загрузчик страниц
 */
export default class PageLoader
{
    /**
     * Опции для всех запросов к указанным страницам
     */
    private options:IRequestOptions;

    /**
     * Массив url адресов для запросов
     */
    private urls:string[];

    /**
     * Очередь запросов
     */
    private requests:IRequestQueueItem[];

    /**
     * Закэшированные результаты
     */
    private static pageLoaded:IPageCache = {};

    /**
     * Конструктор
     * @param urls Массив url адресов
     * @param options Опции запросов
     */
    public constructor( urls: string[], options?:IRequestOptions )
    {
        this.options = {
            timout: 500,
            ...( options || {} )
        };
        this.urls = urls;
        this.requests = [];
        this.runRequests = this.runRequests.bind( this );
    }

    /**
     * Начинает обрабатывать очередь запросов
     */
    private runRequests()
    {
        if ( this.requests.length !== 0 )
        {
            const req = this.requests.pop();
            if ( this.options.cached && PageLoader.pageLoaded[req.url] )
            {
                return req.callback( null, PageLoader.pageLoaded[req.url] );
            }
            request( req.url, 'utf8', ( err, resp, body ) => {
                setTimeout( this.runRequests, this.options.timout );

                if ( err )
                {
                    return req.callback( err );
                }

                if ( this.options.cached )
                {
                    PageLoader.pageLoaded[req.url] = body;
                }

                return req.callback( null, body );
            })
        }
    }

    /**
     * Формирует о отправляет запросы
     * @param progressCb
     */
    public async run( progressCb?: Function )
    {
        const promises = [];
        let count = 1;

        this.urls.forEach( url => {
            promises.push( new Promise( ( res, rej ) => {
                this.requests.push({
                    url: url,
                    callback: ( err, body ) => {
                        if ( err )
                        {
                            return rej( err );
                        }
                        if ( progressCb )
                        {
                            progressCb( count++, promises.length );
                        }
                        res({
                            url: url,
                            body: body
                        });
                    }
                });
            }));
        });

        this.runRequests();

        return Promise.all( promises );
    }
}