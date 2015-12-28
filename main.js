import nodemailer from 'nodemailer';
import getNewAdds from './getNewAdds';

async function sendMailNotifications() {
  const adds = await getNewAdds();

  if (adds.legth) {

    const transporter = nodemailer.createTransport();
    transporter.sendMail({
      from: 'crawler@cyklobazar.cz',
      to: process.env.NOTIFICATION_EMAIL,
      subject: 'New bikes!',
      html: '\
      <html>\
        <head>\
          <link rel="stylesheet" src="http://www.cyklobazar.cz/webtemp/cssloader-152a274595de.css">\
        </head>\
        <body>\
          <ul>' + adds.html().replace(/\/uploads\//g, 'http://www.cyklobazar.cz/uploads/').replace(/href="\//g, 'href="http://www.cyklobazar.cz/') + '</ul>\
        </body>\
      </html>'
    });

  }
}


sendMailNotifications();
