import {pageMapper} from "../mapper";

export interface QueryWhere {
    slug?:string;
}

export class PageController {
    public static async apiGetPage(req: any, res: any, next: any) {
        //   if (!pageMapper.checkAuthenication(req.headers.authorization)) {
        //     return res.status(500).json({error: 'Not Authorized to access the API'})
        // }


        const queryWhere: QueryWhere = {};

        if (req.query[pageMapper.PARAMS_SLUG]) {
            queryWhere.slug = req.query[pageMapper.PARAMS_SLUG];
            const page = await pageMapper.apiGetPage(queryWhere);

            if (!page) {
                return res.status(500).json({error: "Unable to retrieve event"})
            }

            return res.status(200).json({result: "success", event});
        } else {
            const page = await pageMapper.apiGetPages();
            console.log('the sthi');
            console.log(page);
            if (typeof page === 'string') {
                return res.status(500).json({error: page})
            }

            const paginationResults = pageMapper.prepareListResults(page,req.query);
            console.log('the results');
            console.log(paginationResults);
            return res.status(200).json(paginationResults)
        }
    }

    public static async apiCreatePage(req: any, res: any, next: any) {
        try {
            if (req.body[pageMapper.PARAMS_NEW]) {

                const event = await pageMapper.apiCreatePage();

                if (!event) {
                    return res.status(500).json({error: "Error creating Event"})
                }

                return res.status(200).json({result: "success", message: event});
            }

            return  res.status(500).json({result: "error", message: "Missing parameters to access this function"})

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }

    public static async apiUpdatePage(req: any, res: any, next: any) {
     /*   try {
            if (req.body[pageMapper.PARAMS_EVENT][pageMapper.PARAMS_NAME] && req.body[pageMapper.PARAMS_EVENT][pageMapper.PARAMS_ABOUT] && req.body[pageMapper.PARAMS_EVENT][pageMapper.PARAMS_LINK] && req.body[pageMapper.PARAMS_EVENT][pageMapper.PARAMS_BANNER_IMAGE]) {


                const event = await pageMapper.apiUpdateEvent(req.body.identifier, req.body.event);

                if (!event) {
                    return res.status(500).json({error: "Error Event already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }

            return  res.status(500).json({result: "error", message: "Missing parameters to access this function"})

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        } */
    }

    public static async apiImportEvents(req: any, res: any, next: any) {
    /*    try {
            console.log('importing body');
            console.log(req.body);
            if (req.body[pageMapper.PARAMS_NAME] && req.body[pageMapper.PARAMS_CONTENT] && req.body[pageMapper.PARAMS_DATE]) {

                const event = await pageMapper.apiImportEvents(req.body);

                if (!event) {
                    return res.status(500).json({error: "Event already exists"})
                }

                return res.status(200).json({result: "success", message: "Event has been imported"});
            }
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        } */
    }
}