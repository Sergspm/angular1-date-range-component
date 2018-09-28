
export class IndexController {
	public date1: any = null;
	public date2: any = null;

	constructor() {
	}

	changeDates(): void {
		alert(`New dates: from ${this.date1} to ${this.date2}`);
	}
}
