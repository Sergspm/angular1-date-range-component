
export class McDatesController {

	public static $inject: string[] = ['$scope', 'moment', '$timeout'];

	public dateFrom: any = null;
	public dateTo: any = null;
	public dateFromInternal: any = null;
	public dateToInternal: any = null;
	public minDate: any = null;
	public maxDate: any = null;
	public mcChange: any = null;

	private $scope: any;
	private $moment: any;
	private $timeout: any;
	private $format: string = 'YYYY-MM-DD';

	constructor($scope: any, moment: any, $timeout: any) {
		this.$scope  = $scope;
		this.$moment = moment;
		this.$timeout = $timeout;
		$scope.$watch('$ctrl.dateFrom', (newValue: any): void => {
			this.preProcessInternalDate(newValue, 'dateFromInternal', 'minDate');
		});
		$scope.$watch('$ctrl.dateTo', (newValue): void => {
			this.preProcessInternalDate(newValue, 'dateToInternal', 'maxDate');
		});
		$scope.$watch('$ctrl.dateFromInternal', (newValue: any): void => {
			if (newValue instanceof Date) {
				this.dateFrom = moment(newValue).format(this.$format);
			}
		});
		$scope.$watch('$ctrl.dateToInternal', (newValue: any): void => {
			if (newValue instanceof Date) {
				this.dateTo = moment(newValue).format(this.$format);
			}
		});
	}

	dateChanged(): void {
		this.$timeout(() => this.mcChange());
	}

	resetRange(): void {
		this.setDatesRange(null, null);
	}

	setMonthRange(): void {
		const date = new Date();
		this.setDatesRange(this.$moment(date).add(-30, 'days').toDate(), date);
	}

	setTwoWeeksRange(): void {
		const date = new Date();
		this.setDatesRange(this.$moment(date).add(-2, 'weeks').toDate(), date);
	}

	setTodayRange(): void {
		const date = new Date();
		this.setDatesRange(date, date);
	}

	setYesterdayRange(): void {
		const date = this.$moment().add(-1, 'days').toDate();
		this.setDatesRange(date, date);
	}

	private preProcessInternalDate(value: any, nameInternal: any, nameLimiter: any): void {
		if (value instanceof Date) {
			value = this.formatDate(value);
		} else if (value !== null) {
			const date = this.$moment(value + '', this.$format, true);
			value = date.isValid() ? date.format(this.$format) : null;
		}
		this[nameLimiter] = value;
		this[nameInternal] = value;
	}

	private setDatesRange(dateFrom: any, dateTo: any): void {
		if (dateFrom instanceof Date) {
			dateFrom = this.formatDate(dateFrom);
		}
		if (dateTo instanceof Date) {
			dateTo = this.formatDate(dateTo);
		}
		if (dateFrom !== this.dateFrom || dateTo !== this.dateTo) {
			this.dateChanged();
		}
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}

	private formatDate(date: any): string {
		return date instanceof Date ? this.$moment(date).format(this.$format) : date;
	}
}
