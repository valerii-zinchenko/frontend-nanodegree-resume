/**
 * Replace the "%data%" placeholder with a real data in a string.
 *
 * @param {String} str - Template
 * @param {String} data - Real data
 * @param {String} [placeholder="data"] - Placeholdet which will be replaced
 * @return {String} "rendered" template
 */
function replacer(str, data, placeholder) {
	return str.replace("%" + (placeholder || "data") + "%", data);
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
		name: "Valerii Zinchenko",
		role: "Front-End Developer",
		contacts: {
			email: "zinchenko.valerii@gmail.com",
			github: "valerii-zinchenko",
			location: "Kiev, Ukraine"
		},
		welcomeMessage: "Hi :)",
		skills: [
			"OOP",
			"Design patterns",
			"JavaScript",
			"HTML5",
			"CSS",
			"LESS",
			"RequireJS",
			"jQuery",
			"Backbone",
			"Underscore",
			"lodash",
			"Grunt",
			"mocha",
			"sinon",
			"PhantomJS"
		],
		biopic: "images/fry.jpg",
		display: function(){
			var container = $("#header");
			var contacts = container.find("#topContacts");

			container.prepend([
					[HTMLheaderName, this.name],
					[HTMLheaderRole, this.role]
				].map(function(entry) {
					return replacer.apply(null, entry);
				})
			);

			contacts.append([
					[HTMLemail, this.contacts.email],
					[HTMLgithub, this.contacts.github],
					[HTMLlocation, this.contacts.location]
				].map(function(entry) {
					return replacer.apply(null, entry);
				})
			);

			container.append([
					[HTMLbioPic, this.biopic],
					[HTMLwelcomeMsg, this.welcomeMessage],
					[HTMLskillsStart, ""],
				].map(function(entry) {
					return replacer.apply(null, entry);
				})
			);
			container.find("#skills").append(this.skills.map(function(skill) {
				return replacer(HTMLskills, skill);
			}));
		}
	},

	education: {
		schools: [
			{
				name: "Hochschule für Telekommunikation Leipzig der Deutsche Telekom AG",
				location: "Leipzig, Germany",
				degree: "Master of Engineering (M.Eng.)",
				majors: "<a href='http://www.idw-online.de/pages/de/news500377' target='_blank'>Winner of DAAD‑Prize 2012 in HfTL</a>",
				dates: "09.2010 - 10.2012"
			},
			{
				name: "Kiev College of Communication",
				location: "Kiev, Ukraine",
				degree: "Bachelor of Engineering (B.Eng.)",
				//majors: "Finished with honors",
				dates: "09.2005 - 06.2010"
			}
		],
		onlineCourses: [
			{
				title: "Front-End Web Developer Nanodegree",
				school: "Udacity",
				dates: "03.2016 - now",
				url: "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001",
				certificate: ""
			},
			{
				title: "edX XSeries HTML5 from W3C",
				school: "edX",
				dates: "10.2015 - 01.2016",
				url: "https://www.edx.org/xseries/html5-w3c",
				certificate: "https://verify.edx.org/cert/ab6d7af6491e4d878d92b865b032917f"
			},
			{
				title: "edX Verified Certificate for HTML5 Part 2: Advanced Techniques for Designing HTML5 Apps",
				school: "edX",
				dates: "12.2015 - 01.2016",
				url: "https://www.edx.org/course/html5-part-2-advanced-techniques-w3cx-html5-2x-0",
				certificate: "https://courses.edx.org/certificates/72b2d322e9d64879a17bf6df1c538950"
			},
			{
				title: "edX Verified Certificate for HTML5 Part 1: HTML5 Coding Essentials and Best Practices",
				school: "edX",
				dates: "10.2015 - 11.2015",
				url: "https://www.edx.org/course/html5-part-1-html5-coding-essentials-w3cx-html5-1x-0",
				certificate: "https://courses.edx.org/certificates/48e1293cf5ac4d638682fa093aac02d4"
			}
		],
		display: function(){
			var education = $("#education");
			
			education.append(this.schools.map(function(item) {
				var container = $(complexReplacer(HTMLschool, item));

				if (item.majors) {
					container.append(
						replacer(HTMLschoolMajor, item.majors)
					);
				}

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
				employer: "Luxoft",
				title: "Front-End Developer",
				location: "Kiev, Ukraine",
				dates: "05.2014 – in progress (>2 years)",
				description: "design an architecture, develop and support SPA for airlines; customize the application for each airlines; optimize and speedup the application's loading; refactor, stabilize and uniform the application's core; integrate task runner, unit testing framework and adapt the Maven build file for CI; lead/manage a small team of developers",
				url: "http://www.luxoft.com/"
			},
			{
				employer: "EggmenGroup",
				title: "Software and Web Developer",
				location: "Kiev, Ukraine",
				dates: "11.2012 – 04.2014 (1 year 6 months)",
				description: "support and development of Energine CMF (on GitHub): develop special effects; improve, refactor and document code; write tests; bug fixing; move projects from SVN to Git with history; design and develop forecasting system for servers; make researches.",
				url: "http://eggmengroup.com/"
			},
			{
				employer: "Center of Eye Microsurgery",
				title: "Software Developer (part time)",
				location: "Kiev, Ukraine",
				dates: "06.2010 - 10.2012 (2 years 4 months)",
				description: "development of program to process MRIs (magnetic resonance images); development of script to build mathematical human eye in 3D; create a short presentation movie in 3D of diagnostic and treatment of human eye tumor; build 3D models of tumors",
				url: "http://cmho.com.ua/ua/"
			},
			{
				employer: "Hochschule für Telekommunikation Leipzig der Deutsche Telekom AG (HfTL), Institut für Hochfrequenztechnik",
				title: "Laboratory assistant",
				location: "Leipzig, Germany",
				dates: "09.2010 – 04.2012 (1 year 7 months)",
				description: "design a process chain from the point of EMC between power station, electric vehicle and communication system (sources and receivers of noise) and verify German and international standards for this chain; assistant in EMC‑Laboratory; development of virtual instruments (VI) in LabVIEW",
				url: "https://www.hft-leipzig.de/"
			}
		],
		display: function(){
			$("#workExperience").append(this.jobs.map(function(item) {
				return complexReplacer(HTMLwork, item);
			}));
		}
	},

	projects: {
		projects: [
			{
				title: "TaskOnFly",
				dates: "2015 - in progress",
				description: "Simple, light and offline task manager. Manage your tasks and lists of tasks on the fly.",
				url: "https://github.com/valerii-zinchenko/TaskOnFly",
				images: ""
			},
			{
				title: "#Router",
				dates: "2016",
				description: "#Router is a simple hash router for a Single Page Application (SPA). The implementation follows the Mobile Web Application Best Practices from W3C.",
				url: "https://github.com/valerii-zinchenko/hash-router",
				images: ""
			}
		],
		display: function(){
			$("#projects").append(this.projects.map(function(item) {
				return complexReplacer(HTMLproject, item);
			}));
		}
	}
};

for (var component in data) {
	if (data.hasOwnProperty(component)) {
		data[component].display();
	}
}

$("#main").append(internationalizeButton);

$("#mapDiv").append(googleMap);
