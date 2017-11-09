// Dependencies
const scraperjs = require('scraperjs')
const setTitle = require('node-bash-title')

// src
const parseName = require('./src/parseName.js')
const parseBadge = require('./src/parseBadge.js')

// Start the code here

setTitle('designernews-cli')

scraperjs.StaticScraper.create('https://www.designernews.co/')
	.scrape(function($) {
		return $('.montana-list-item').map(function() {
			return {
				id: $(this).attr('data-story-id'),
				upvotes: $(this.childNodes[1].childNodes[0].childNodes[4]).text(),
				badge: parseBadge($(this.childNodes[0].childNodes[0]).attr('href'))
      }
		}).get()
	})
	.then(function(news) {
		console.log(news)
	})