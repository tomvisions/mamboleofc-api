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
    private _body: string;
    private _subject: string;
    private _emailType: string;
    private _phone: string;
    private _name;
    private _email;
    private _teamName
    private _params;
    private _SUBJECT_CONTENT;
    private _HTML_CONTENT;
    private _TEXT_CONTENT;
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_EMAIL_TYPE: string = 'email_type';
    private _PARAMS_BODY: string = 'body';
    private _PARAMS_SUBJECT: string = 'subject';
    private _PARAMS_PHONE: string = 'phone';
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_TEAM_NAME: string = 'team_name';


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
            case EmailMessaging.EMAIL_TYPE_CONTACT_US:
                this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
                this._params.Destination.ToAddresses.push('mamboleofc@gmail.com');
                this._params.Source = 'tomc@tomvisions.com';
                this._params.ReplyToAddresses = [];
                this._params.Template = 'ContactUs';
                await this.getContactUsEmail();
                this._params.TemplateData = `{\"PHONE_CONTENT\":\"${this._phone}\",\"SUBJECT_CONTENT\":\"${this._SUBJECT_CONTENT}\",\"NAME_CONTENT\":\"${this._name}\", \"NAME\":\"Info\",\"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"EMAIL_CONTENT\":\"${this._email}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

            case EmailMessaging.EMAIL_TYPE_TOURNAMENT_REGISTRATION:
                this._params.Destination.ToAddresses.push('tcruicksh@gmail.com');
                this._params.Destination.ToAddresses.push('mamboleofc@gmail.com');
                this._params.Source = 'tomc@tomvisions.com';
                this._params.ReplyToAddresses = [];
                this._params.Template = 'TournamentRegistration';
                await this.getRegistrationEmail();
                this._params.TemplateData = `{\"NAME_CONTENT\":\"${this._name}\", \"NAME\":\"Info\",\"TEAM_NAME_CONTENT\":\"${this._teamName}\", \"HTML_CONTENT\":\"${this._HTML_CONTENT}\",\"EMAIL_CONTENT\":\"${this._email}\",  \"TEXT_CONTENT\":\"${this._TEXT_CONTENT}\"}`;
                break;

        }
    }

    async parseBody(body) {
        this._body = body[this._PARAMS_BODY] || null;
        this._subject = body[this._PARAMS_SUBJECT] || null;
        this._emailType = body[this._PARAMS_EMAIL_TYPE] || null;
        this._phone = body[this._PARAMS_PHONE] || null;
        this._name = body[this._PARAMS_NAME] || null
        this._email = body[this._PARAMS_EMAIL] || null;
        this._teamName = body[this._PARAMS_TEAM_NAME] || null;

    }

    async getContactUsEmail() {
        this._SUBJECT_CONTENT = format(EmailMessaging.CONTACTUS_SUBJECT, this._subject)
        this._HTML_CONTENT = format(EmailMessaging.CONTACTUS_CONTENT_HTML);
        this._TEXT_CONTENT = format(EmailMessaging.CONTACTUS_CONTENT_TEXT);
    }

    async getRegistrationEmail() {
        this._HTML_CONTENT = format(EmailMessaging.REGISTRATION_CONTENT_HTML);
        this._TEXT_CONTENT = format(EmailMessaging.REGISTRATION_CONTENT_TEXT);
    }


    async apiSendMail() {
        console.log('start');
        console.log(this._params);
        console.log(await this._sesClient.send(new SendTemplatedEmailCommand(this._params)));
        console.log('ending')
        return await this._sesClient.send(new SendTemplatedEmailCommand(this._params));
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

    get PARAMS_TEAM_NAME(): string {
        return this._PARAMS_TEAM_NAME;
    }
}

export const mailMapper = new MailMapper();
