import {AccessController} from "./controllers/access.controller";

async function Run() {
    const test = {
        "name": "Viewer",
        "level" : "1"
    };
    const body = {}
    body['body'] = test;

    //  const mail = await new EventController();
    const retval = await AccessController.apiCreateAccess(body, null, null);
    console.log(retval);
//                params = `{"${PARAMS_ID}":"${req.body[PARAMS_ID]}","${PARAMS_GAME}":"${req.body[PARAMS_GAME]}"}`;
// const gameObject = await MailMapper.apiSendMail(id, game);
//          console.log('the game');
//  console.log(gameObject)
//            return res.status(200).json({result: "success", message: `an issue here ${util.inspect(test)}`});
    // await MailController.apiSendMail()
}

Run();
