import * as _ from 'underscore';

const OPTIONS: IPriority[] = [
    { name: 'Blocker', value: 1, className: 'badge-danger'},
    { name: 'Critical', value: 2, className: 'badge-warning'},
    { name: 'Major', value: 3, className: 'badge-primary'},
    { name: 'Minor', value: 4, className: 'badge-secondary'},
    { name: 'Trivial', value: 5, className: 'badge-light'}
];

export interface IPriority {
    name: string;
    value: number;
    className: string;
}

export class PriorityOptions {

    static getOptions(): IPriority[] {
        return OPTIONS;
    }

    static getOptionByValue(value: number): IPriority {
        return _.findWhere(OPTIONS, {value});
    }
}
