import nJwt from 'njwt';
import dotenv from "dotenv";
import * as uuid from 'uuid';
dotenv.config();

export interface PaginationResults {
    list:any,
    pagination: any;
}

export interface Query {
    search?:string;
    sort?:string;
    order?:string;
    page?:number;
    size?:number;
}

/*
The Base Mapper. Functions which are in common with others mappers are placed here to avoid duplication of code
 */
export class BaseMapper {
    private _QUERY: string;

    public async processArray(listing) {
        console.log('the listing');
        console.log(listing);
        if (listing.length) {
            const listArray = [];

            for (let item of listing) {
                console.log('item');
                console.log(item);
                listArray.push(item.get());
            }

            return listArray;
        }

        return [];
    }

    /**
     * Preparing the paginated results
     * @param list
     * @param query
     */
    public prepareListResults(list, query: Query = {}) {
        return this.generatePagination(list, query)
    }

    /**
     * Generation of pagination for various retrieval of lists
     * @param list: string[]
     * @param query: Query
     */
    public generatePagination(list:string[], query: Query = {}) : PaginationResults {
        let listClone;
        listClone = list;
   //     console.log('the list');
     //   console.log(list);
     //   console.log(query);

        const search = query.search || null;
        const sort = query.sort || this['DEFAULT_SORT']
        const order = query.order || 'asc';
        const page = query.page || 1;
        const size = query.size || 10;
        console.log('the clone');
        console.log(listClone);
        if (sort === 'identifier' || sort === query.sort)
        {
            console.log('the clone');
            console.log(listClone);
            listClone.sort((a, b) => {

                const fieldA = a[sort].toString().toUpperCase();
                const fieldB = b[sort].toString().toUpperCase();

                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        }
        else
        {
            listClone.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
        }

        // If search exists...
        if ( search )
        {
            // Filter the products
            listClone = listClone.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
        // Paginate - Start
        const listLength = listClone.length;
        // Calculate pagination details
        const begin = (page -1 ) * size;
        const end = Math.min((size * (page + 1)), listLength);
        const lastPage = Math.max(Math.ceil(listLength / size), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested page number is bigger than
        // the last possible page number, return null for
        // products but also send the last possible page so
        // the app can navigate to there
        if ( page > lastPage )
        {
            listClone = null;
            pagination = {
                lastPage
            };
        } else {
            // Paginate the results by size
            list = listClone.slice(begin, end);
            // Prepare the pagination mock-api
            pagination = {
                length    : listLength,
                size      : size,
                page      : page,
                lastPage  : lastPage,
                startIndex: begin,
                endIndex  : end - 1
            };
        }

        return JSON.parse(`{"${this['_LIST_NAME']}":${JSON.stringify(list)}, "pagination": ${JSON.stringify(pagination)}}`);
    }

    public generateJWTToken() {
        const token = nJwt.create({
            iss: "http://mamboleofc.ca/",  // The URL of your service
            sub: uuid.v4(),    // The UID of the user in your system
            scope: "self"
        },process.env.TOKEN_SECRET);

        token.setExpiration(new Date().getTime() + 60*1000)

        return token.compact();
    }

    public checkAuthenication(tokenHeader = undefined) {
        if (!tokenHeader) {
            return undefined
        }

        try {
            const token = tokenHeader.replace(/^Bearer\s/, '');

            const verified = nJwt.verify(token, process.env.TOKEN_SECRET);

            return (verified.body['exp'] < Date.now());
        } catch (error) {
            return error.toString();
        }
    }


    set QUERY(value: string) {
        this._QUERY = value;
    }
}
