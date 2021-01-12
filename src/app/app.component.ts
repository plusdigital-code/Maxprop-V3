import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormioResources } from 'angular-formio/resource';
import { FormioAuthService } from 'angular-formio/auth';
import * as algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
	'5BBJ80MJOQ',
	'f4ea2ed5e0ca195e2b6a738317266397'
);

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';
	fieldToDisplay = 'name';
	code ='code';
	cover ='cover';
	price ='price';
	floor ='floor';
	currentWebUrl = '';



	constructor(
		private auth: FormioAuthService,
		private router: Router,
		private _route: ActivatedRoute,
		public resources: FormioResources
	) {

		router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.currentWebUrl=val.url;
				this.handleRouteChange(val.url);
			}
		});

		this.auth.onLogin.subscribe(() => {
			this.router.navigate(['/home']);
		});

		this.auth.onLogout.subscribe(() => {
			this.router.navigate(['/auth/login']);
		});

		this.auth.onRegister.subscribe(() => {
			this.router.navigate(['/home']);
		});
		this.resources.error.subscribe((resp => {
			if (resp === 'unauthorized') {
				this.router.navigate(['/auth/login']);
			}
		}))
	}

	config = {
		indexName: 'prod_Practitioner',
		searchFunction: (helper) => {
			const container = document.querySelector('#results') as HTMLElement;
			helper.state.index = this.getCurrentIndexName();
			if (helper.state.query !== '') {
				container.style.display = '';
			} else {
				container.style.display = 'none';
			}
			helper.search();
		},
		searchClient
	};

	pagePaths = [
		{
			path: '/user',
			indexName: 'maxprop_Practitioners',
			fieldToDisplay: 'name'
		},
		{
			path: '/residential',
			indexName: 'maxprop_App_Residential',
			fieldToDisplay: 'address',
			code:'code',
			cover:'cover',
			price:'price',
		}
	];
	showSearch = false;

	getCurrentIndexName() {
		let currentUrl = this.router.url;
		let pathObj = this.pagePaths.find(ele => ele.path === currentUrl);
		if(pathObj){ return pathObj.indexName}
		// for (let i = 0; i < this.pagePaths.length; i++) {
		// 	let pagePath = this.pagePaths[i].path;
		// 	if (currentUrl.indexOf(pagePath) === currentUrl.length - pagePath.length) {
		// 		console.log(currentUrl);
		// 		return this.pagePaths[i].indexName;
		// 	};
		// }

	}

	handleRouteChange(currentUrl) {
		for (let i = 0; i < this.pagePaths.length; i++) {
			let pagePath = this.pagePaths[i].path;
			if (currentUrl.indexOf(pagePath) >= 0 && currentUrl.indexOf(pagePath) === currentUrl.length - pagePath.length) {
				console.log(currentUrl);
				this.config.indexName = this.pagePaths[i].indexName;
				this.fieldToDisplay = this.pagePaths[i].fieldToDisplay;
				this.showSearch = true;
				return true;
			};
		}
		this.showSearch = false;
		return false;
	}


	cardSelected(hit) {
		console.log(`${this.router.url}/${hit.objectID}/view`)
		this.router.navigateByUrl(`${this.router.url}/${hit.objectID}/view`);

	}

}
