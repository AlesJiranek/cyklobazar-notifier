import Promise from 'bluebird';
import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';

fetch('http://www.cyklobazar.cz')
  .then(response => response.text())
  .then(html => cheerio.load(html));
