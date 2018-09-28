import { IComponentOptions } from 'angular';
import { McDatesController } from '../Controllers/mc-dates.controller';

import './mc-dates.scss';

export class McDatesComponent implements IComponentOptions {
	public bindings: any = {
		dateFrom: '=',
		dateTo: '=',
		mcChange: '&'
	};
	public controller: any = McDatesController;
	public templateUrl: string = 'templates/mc-dates.component.html';

	constructor() {
	}
}
