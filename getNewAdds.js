import Promise from 'bluebird';
import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import querystring from 'querystring';


export default async function getNewAdds() {
  const filters = {
    type: 'sell',
    'filter[list_wheel_diameter_id]' : 3,
    priceMax: 25000
  };

  const addSelector = 'body > div.container > div.row > div.col-main > ul.media-list > li.media';

  return fetch('http://www.cyklobazar.cz/horska-kola?' + querystring.stringify(filters))
    .then(response => response.text())
    .then(text => cheerio.load(text))
    .then($ => $(addSelector))
    .then(adds => adds.filter((i, add) => {
      const dateTitle = cheerio(add).find('div.media-body > div.media-heading > small.pull-right').attr('title');
      const dateString = dateTitle.split(' ').slice(1).join(' '); // Remove string at the beggining of title (Aktualizováno / Vytvořeno)
      const addDate = moment(dateString, 'DD.MM.YYYY, HH:mm');
      const dateToCompare = moment().subtract(1, 'hours');

      return addDate.isAfter(dateToCompare);
    }));
}
