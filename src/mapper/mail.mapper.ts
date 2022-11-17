"use strict";

import {SESClient, SendTemplatedEmailCommand} from '@aws-sdk/client-ses';
import {emailParams} from '../data/email-params';
import {emailHeader} from '../data/email.header';
import {emailFooter} from '../data/email.footer';
import {format} from 'util';
import {EmailMessaging} from '../models/EmailMessaging';

export interface Params {
//    Destination
}

export class MailMapper {
    private _sesClient;
    private _REGION: string = 'us-east-1'
    private _to: string;
    private _body: string;
    private _subject: string;
    private _emailType: string;
    private _phone: string;
    private _name;
    private _email;
    private _params;
    private _SUBJECT_CONTENT;
    private _HTML_CONTENT;
    private _TEXT_CONTENT;
    private _NAME_CONTENT;
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_EMAIL_TYPE: string = 'email_type';
    private _PARAMS_BODY: string = 'body';
    private _PARAMS_SUBJECT: string = 'subject';
    private _PARAMS_PHONE: string = 'phone';
    private _PARAMS_NAME: string = 'name';


    constructor() {
        this._sesClient = new SESClient({'region': this._REGION});
    }


    /**
     * Function that helps prepare the email
     * @param body
     */
    async prepareEmail(body) {
        this._params = emailParams;
        await this.parseBody(body);

        switch (this._emailType) {
            case "contact-us":
                this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
   //             this._params.Destination.ToAddresses.push('mamboleofc@gmail.com');
                this._params.Source = 'admin@mamboleofc.ca';
                this._params.ReplyToAddresses = [];
                this._params.Template = 'ContactUs';
                await this.getContactUsEmail();
                this._params.TemplateData = `{\"PHONE_CONTENT\":\"${this._phone}\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"NAME_CONTENT\":\"${this._name}\", \"NAME\":\"Info\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"EMAIL_CONTENT\":\"${this._email}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

        }
    }

    async parseBody(body) {
        this._body = body[this._PARAMS_BODY];
        this._subject = body[this._PARAMS_SUBJECT] || null;
        this._emailType = body[this._PARAMS_EMAIL_TYPE];
        this._phone = body[this._PARAMS_PHONE];
        this._name = body[this._PARAMS_NAME];
        this._email = body[this._PARAMS_EMAIL];

    }

    async genereateParmams() {
        var params = {
            Destination: { /* required */
                CcAddresses: [
                    'EMAIL_ADDRESS',
                    /* more items */
                ],
                ToAddresses: [
                    'EMAIL_ADDRESS',
                    /* more items */
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: "HTML_FORMAT_BODY"
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Test email'
                }
            },
            Source: 'SENDER_EMAIL_ADDRESS', /* required */
            ReplyToAddresses: [
                'EMAIL_ADDRESS',
                /* more items */
            ],
        };
    }

    async getContactUsEmail() {
        this._SUBJECT_CONTENT = format(EmailMessaging.CONTACTUS_SUBJECT,  this._subject)
        this._HTML_CONTENT = format(EmailMessaging.CONTACTUS_CONTENT_HTML,  this._body);
        this._TEXT_CONTENT = format(EmailMessaging.CONTACTUS_CONTENT_TEXT, this._body);
    //    console.log(this.HTML_CONTENT);

    }

    async apiSendMail() {
   //     try {

            // Create sendEmail params
        //    return JSON.stringify(this.params);
          //  return new SendTemplatedEmailCommand(this.params);
      //  const test = new SESClient({'region': this.REGION});
  //      this.params.Message.Body.Html.Data = 'HTML_FORMAT_BODY';
    //    console.log(this.params);
     //   console.log(this.params.Message.Body)
        const params = {
            Destination: {
                /* required */
                CcAddresses: [
                    /* more items */
                ],
                ToAddresses: [
                    "tcruicksh@gmail.com", //RECEIVER_ADDRESS
                    /* more To-email addresses */
                ],
            },
            Source: "tomc@tomvisions.com", // SENDER_ADDRESS
            ReplyToAddresses: [
                /* more items */
            ],
            Template: "ContactUs",
            TemplateData: "{\"subjectLine\":\"testing\",\"name\":\"tom\",\"HTMLCONTENT\":\"hello\",\"TEXTCONTENT\":\"goodbye\"}"
        };
  //      console.log(this.params);
          return await this._sesClient.send(new SendTemplatedEmailCommand(this._params));
       // console.log("Success", boo);
          //  console.log("Success.", data);
           // return data; // For unit tests.
     //   } catch (err) {

       //     return false;
//                console.log("Error", err);

   //     }
    }

    get PARAMS_PHONE(): string {
        return this._PARAMS_PHONE;
    }

    get PARAMS_SUBJECT(): string {
        return this._PARAMS_SUBJECT;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get PARAMS_EMAIL(): string {
        return this._PARAMS_EMAIL;
    }

    get PARAMS_EMAIL_TYPE(): string {
        return this._PARAMS_EMAIL_TYPE;
    }

    get PARAMS_BODY(): string {
        return this._PARAMS_BODY;
    }
}

export const mailMapper = new MailMapper();
