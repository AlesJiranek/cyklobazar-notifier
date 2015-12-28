import Promise from 'bluebird';
import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import nodemailer from 'nodemailer';
import querystring from 'querystring';


const filters = {
  type: 'sell',
  'filter[list_wheel_diameter_id]' : 3,
  priceMax: 25000
};

const addSelector = 'body > div.container > div.row > div.col-main > ul.media-list > li.media';

fetch('http://www.cyklobazar.cz/horska-kola?' + querystring.stringify(filters))
  .then(response => response.text())
  .then(text => cheerio.load(text))
  .then($ => $(addSelector))
  .then(adds => adds.filter((i, add) => {
    const dateTitle = cheerio(add).find('div.media-body > div.media-heading > small.pull-right').attr('title');
    const dateString = dateTitle.split(' ').slice(1).join(' '); // Remove string at the beggining of title (Aktualizováno / Vytvořeno)
    const addDate = moment(dateString, 'DD.MM.YYYY, HH:mm');
    const dateToCompare = moment().subtract(1, 'hours');

    return addDate.isAfter(dateToCompare);
  }))
  .then(filtered => {
    if (filtered.legth === 0)
      return;

    const transporter = nodemailer.createTransport();
    transporter.sendMail({
      from: 'crawler@cyklobazar.cz',
      to: 'a.jiranek@centrum.cz',
      subject: 'New bikes!',
      html: '\
      <html>\
        <head>\
          <link rel="stylesheet" src="http://www.cyklobazar.cz/webtemp/cssloader-152a274595de.css">\
        </head>\
        <body>\
          <ul>' + filtered.html().replace(/\/uploads\//g, 'http://www.cyklobazar.cz/uploads/').replace(/href="\//g, 'href="http://www.cyklobazar.cz/') + '</ul>\
        </body>\
      </html>'
    });
  });
