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