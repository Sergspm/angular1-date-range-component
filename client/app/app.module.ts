import { module } from 'angular';

import 'moment';
import 'angular-moment';

import 'angular-animate';
import 'angular-aria';
import 'angular-material/angular-material.min.css';
import 'angular-material/angular-material.min';

import { McDatesComponent } from './Components/mc-dates.component';
import { IndexController } from './Controllers/index.controller';

import './app.scss';

module('testApp', ['ngMaterial', 'ngAnimate', 'angularMoment'])
	.component('mcDates', new McDatesComponent())
	.controller('IndexController', IndexController)
	.config(($mdDateLocaleProvider: any, moment: any):void => {
		$mdDateLocaleProvider.formatDate = (date):string => date ? moment(date).format('DD.MM.YYYY') : '';
	});
