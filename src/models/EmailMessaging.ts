const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT_US = 'contact_us';
    static EMAIL_TYPE_TOURNAMENT_REGISTRATION = 'tournament_registration';

    static CONTACTUS_SUBJECT = '%s';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Us Form:\\n%s`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Us Form:</p><p>%s</p>';

    static REGISTRATION_CONTENT_TEXT = `You have received a new registration from the Registration Form.`;
    static REGISTRATION_CONTENT_HTML = '<p>You have received a new registration from the Registration Form.</p>';

}
