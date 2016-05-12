'use strict';

/**
 * Replace the "%data%" placeholder with a real data in a string.
 *
 * @param {String} str - Template
 * @param {String} data - Real data
 * @param {String} [placeholder="data"] - Placeholdet which will be replaced
 * @return {String} "rendered" template
 */
function replacer(str, data, placeholder) {
	return str.replace(new RegExp('\%' + (placeholder || 'data') + '\%', 'g'), data);
}

/**
 * Replace different placeholders in one string template
 *
 * @param {String} str - Template
 * @param {Object} data - Data object, where the key is a plcaholder and the value is the real data, that is going to be inserted into the template.
 * @return {String} "rendered" template
 */
function complexReplacer(str, data) {
	for (var key in data) {
		str = replacer(str, data[key], key);
	}

	return str;
}

var data = {
	bio: {
		name: 'Valerii Zinchenko',
		role: 'Front-End Web Developer',
		contacts: {
			mobile: '+380&nbsp;(00)&nbsp;123-4567',
			twitter: 'myTwitter',
			email: 'zinchenko.valerii@gmail.com',
			github: 'valerii-zinchenko',
			location: 'Kiev, Ukraine'
		},
		welcomeMessage: 'Hi :)',
		skills: [
			'OOP',
			'Design patterns',
			'JavaScript',
			'HTML5',
			'CSS',
			'Bootstrap',
			'LESS',
			'RequireJS',
			'Backbone',
			'Underscore',
			'jQuery',
			'lodash',
			'Grunt',
			'mocha',
			'sinon',
			'PhantomJS',
			'vim'
		],
		biopic: 'images/fry.jpg',
		display: function(){
			var container = $('#header');
			var contacts = complexReplacer(HTMLcontacts, this.contacts);

			container.append(
				complexReplacer(HTMLheader, this),
				complexReplacer(HTMLbioPicWelcomeMsg, this),
				HTMLskillsStart
			);

			container.find('#topContacts').append(contacts);

			container.find('#skills').append(this.skills.map(function(skill) {
				return replacer(HTMLskills, skill);
			}));

			$('#footerContacts').append(contacts);
		}
	},

	education: {
		schools: [
			{
				name: 'Hochschule für Telekommunikation Leipzig der Deutsche Telekom AG',
				location: 'Leipzig, Germany',
				degree: 'Master of Engineering (M.Eng.)',
				majors: ['Information and Communication Technologies'],
				dates: '09.2010 - 10.2012',
				url: 'https://www.hft-leipzig.de/'
			},
			{
				name: 'Kiev College of Communication',
				location: 'Kiev, Ukraine',
				degree: 'Bachelor of Engineering (B.Eng.)',
				majors: ['Information Networks of Communications'],
				dates: '09.2005 - 06.2010',
				url: 'http://kkz.net.ua/'
			}
		],
		onlineCourses: [
			{
				title: 'Front-End Web Developer Nanodegree',
				school: 'Udacity',
				date: '03.2016 - now',
				url: 'https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001',
				certificate: ''
			},
			{
				title: 'edX XSeries HTML5 from W3C',
				school: 'edX',
				date: '10.2015 - 01.2016',
				url: 'https://www.edx.org/xseries/html5-w3c',
				certificate: 'https://verify.edx.org/cert/ab6d7af6491e4d878d92b865b032917f'
			},
			{
				title: 'edX Verified Certificate for HTML5 Part 2: Advanced Techniques for Designing HTML5 Apps',
				school: 'edX',
				date: '12.2015 - 01.2016',
				url: 'https://www.edx.org/course/html5-part-2-advanced-techniques-w3cx-html5-2x-0',
				certificate: 'https://courses.edx.org/certificates/72b2d322e9d64879a17bf6df1c538950'
			},
			{
				title: 'edX Verified Certificate for HTML5 Part 1: HTML5 Coding Essentials and Best Practices',
				school: 'edX',
				date: '10.2015 - 11.2015',
				url: 'https://www.edx.org/course/html5-part-1-html5-coding-essentials-w3cx-html5-1x-0',
				certificate: 'https://courses.edx.org/certificates/48e1293cf5ac4d638682fa093aac02d4'
			}
		],
		display: function(){
			var education = $('#education');
			
			education.append(this.schools.map(function(item) {
				var container = $(complexReplacer(HTMLschool, item));
				return container;
			}));
			
			if (this.onlineCourses.length > 0) {
				education.append(HTMLonlineClasses);

				education.append(this.onlineCourses.map(function(item) {
					var container = $(complexReplacer(HTMLonline, item));

					if (item.certificate) {
						container.append(replacer(HTMLonlineCertificate, item.certificate));
					}

					return container;
				}));
			}
		}
	},

	work: {
		jobs: [
			{
				employer: 'Luxoft',
				title: 'Front-End Web Developer',
				location: 'Kiev, Ukraine',
				dates: '05.2014 – in progress (>2 years)',
				description: 'iTravelJS - is a Single Page Application which can provide different functionalities for airline companies such as online booking, check in, login/registration into a loyalty programm, track delayed baggage, check flight status and so on. At the middle of the autumn 2014 it was deployed into the production. Since that time three airlines are using this app and five airline companies are going to go live till the end of 2016. In the project I was fully responsible for a client-side. Also I was involved into the discussions of the interface design between the server and the client app.',
				keyItems: [
					'design an architecture, develop and support SPA',
					'refactor, stabilize and uniform the application\'s core',
					'introduce the application configuration system for each airline and each environment',
					'optimize and speedup the application\'s loading',
					'integrate task runner, unit testing framework and adapt the Maven build file for CI',
					'improve the logging system of JS exceptions for the furthe analysis and fixing',
					'lead/manage a small team of developers'
				],
				url: 'http://www.luxoft.com/'
			},
			{
				employer: 'EggmenGroup',
				title: 'Software and Web Developer',
				location: 'Kiev, Ukraine',
				dates: '11.2012 – 04.2014 (1 year 6 months)',
				description: 'At the beginning I was working on different directions. I discovered recommendation system, integrated few DTrace scripts for our servers to speedup theirs notification and synchronisation. Then I started to design and develop forecasting system for server parameters. In the middle of 2013 I was involved into the main project - Energine CMF. First, I have successfully migrated all projects from SVN to Git and GitHub systems with saving of all histories and connecting the existing GithHub profiles to the past commits. Then I made a code review of the whole JavaScript code, refactored and improved its performance and docummented it. After this I started to support and develop the JavaScript code of Energine CMF.',
				keyItems: [
					'support and development of Energine CMF (on GitHub); develop special effects',
					'improve, refactor and document code; write tests; fix bugs',
					'move projects from SVN to Git with history',
					'design and develop forecasting system for servers',
					'make researches'
				],
				url: 'http://eggmengroup.com/'
			},
			{
				employer: 'Center of Eye Microsurgery',
				title: 'Software Developer (part time)',
				location: 'Kiev, Ukraine',
				dates: '06.2010 - 10.2012 (2 years 4 months)',
				description: 'In parralel with the education I have supported Center of Eye Microsurgery in Kiev. At the beginning I have built 3D models of tumors from the MRIs (magnetic resonance images). In a few months I was requested to build an application that recreates a 3D model of the tumore from the MRIs and places it in a mathematical model of the eye. Project was stopped.',
				keyItems: [
					'development of program to process MRIs and recreates tumore',
					'development of script to build mathematical human eye in 3D',
					'create a short presentation movie in 3D of diagnostic and treatment of human eye tumor',
					'build 3D models of tumors'
				],
				url: 'http://cmho.com.ua/ua/'
			},
			{
				employer: 'Hochschule für Telekommunikation Leipzig der Deutsche Telekom AG, Institut für Hochfrequenztechnik (IHF)',
				title: 'Laboratory assistant',
				location: 'Leipzig, Germany',
				dates: '09.2010 – 04.2012 (1 year 7 months)',
				description: 'In parralel with the education I was working in the IHF laboratories as an assistant.',
				keyItems: [
					'design a process chain from the point of EMC between power station, electric vehicle and communication system',
					'assistant in EMC‑Laboratory',
					'development of virtual instruments (VI) in LabVIEW'
				],
				url: 'https://www.hft-leipzig.de/'
			}
		],
		display: function(){
			$('#workExperience').append(this.jobs.map(function(item) {
				var container = $(complexReplacer(HTMLwork, item));

				container.find('.key-items').append(
					item.keyItems.map(function(keyItem) {
						return replacer(HTMLworkItem, keyItem);
					})
				);

				return container;
			}));
		}
	},

	projects: {
		projects: [
			{
				title: 'TaskOnFly',
				dates: '2015 - in progress',
				description: 'Simple, light and offline task manager. Manage your tasks and lists of tasks on the fly.',
				url: 'https://github.com/valerii-zinchenko/TaskOnFly',
				images: ['http://placehold.it/350x150', 'http://placehold.it/350x150']
			},
			{
				title: '#Router',
				dates: '2016',
				description: '#Router is a simple hash router for a Single Page Application (SPA). The implementation follows the Mobile Web Application Best Practices from W3C.',
				url: 'https://github.com/valerii-zinchenko/hash-router',
				images: ['http://placehold.it/150x150', 'http://placehold.it/150x150']
			}
		],
		display: function(){
			$('#projects').append(this.projects.map(function(item) {
				var container = $(complexReplacer(HTMLproject, item));

				container.append(
					item.images.map(function(img){
						return replacer(HTMLprojectImg, img);
					})
				);

				return container;
			}));
		}
	}
};

for (var component in data) {
	if (data.hasOwnProperty(component)) {
		data[component].display();
	}
}

$('main').append(internationalizeButton);

$('#mapDiv').append(googleMap);
