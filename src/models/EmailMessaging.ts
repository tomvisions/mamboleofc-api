const os = require('node:os');

export class EmailMessaging
{
    static CONTACTUS_SUBJECT = '%s';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Us Form:\\n%s`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Us Form:</p><p>%s</p>';
}
