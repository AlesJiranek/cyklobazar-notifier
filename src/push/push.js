import Push from 'pushover-notifications';
import moment from 'moment';
import getNewAdds from '../getNewAdds';


async function sendPushNotifications() {
  const startDate = moment().subtract(12, 'm');
  const adds = await getNewAdds(startDate);

  if (adds.length) {
    const latestAdd = adds.first();
    const titleNode = latestAdd.find('div.media-heading > h5 > a');
    const url = 'http://www.cyklobazar.cz' + titleNode.attr('href');
    const title = titleNode.text();
    const message = latestAdd.find('div.media-content').text();

    const notification = new Push({
      user: process.env['PUSHOVER_USER'],
      token: process.env['PUSHOVER_TOKEN']
    });

    notification.send({title, message, url});
    console.info('Notification was sent.');
  }
  else {
    console.info('No new advertisments.');
  }
}


sendPushNotifications();
