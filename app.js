const scraperjs = require('scraperjs')
const parseName = require('./src/parseName.js')

scraperjs.StaticScraper.create('https://www.designernews.co/')
	.scrape(function($) {
		return $('.montana-item-title').map(function() {
			return {
				title: $(this).attr('alt'),
				url: $(this).attr('href'),
				time: $(this.nextSibling.children[2]).text(),
				from: parseName($(this.nextSibling.children[3]).text()),
      }
		}).get()
	})
	.then(function(news) {
		console.log(news)
	})