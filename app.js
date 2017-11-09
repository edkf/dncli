// Dependencies
const setTitle = require('node-bash-title')
const scrapeIt = require("scrape-it")
const inquirer = require("inquirer")
const openurl = require('openurl')
const chalk = require('chalk')

// src
const parseName = require('./src/parseName.js')
const parseBadge = require('./src/parseBadge.js')

// Start the code here

setTitle('📰 dncli - CLI to browse designernews.co')

scrapeIt(
	process.argv[2] ? `https://www.designernews.co/badges/${process.argv[2]}` : 'https://www.designernews.co'
	, {
	stories: {
		listItem: '.montana-list-item',
		data: {
			id: {
				attr: 'data-story-id'
			},
			upvotes: '.upvoted-number',
			title: {
				selector: '.montana-item-title',
				attr: 'alt'
			},
			url: {
				selector: '.montana-item-title',
				attr: 'href'
			},
			timeAgo: '.list-story-time-ago',
			from: '.montana-item-meta span a'
		}
	}
	}).then(data => {
		const storiesQuestions = {
			type: 'list',
			name: 'selectedStorie',
			message: 'Select a story to read',
			pageSize: 30,
			choices: data.stories.map(item => {
				return {
					name: `${chalk.green('▴')} ${chalk.gray(`${ ('0' + Number(item.upvotes)).slice(-2)} |`)} ${item.title} ${chalk.gray(`- by ${item.from} (${item.timeAgo})`)}`,
					value: item.id
				}
			})
		}
		inquirer.prompt([storiesQuestions]).then(function (answer) {
			for (let i = 0; i < data.stories.length; i++) {
				if (data.stories[i].id === answer.selectedStorie) {
					openurl.open(data.stories[i].url)
				}
			}
		})
	})