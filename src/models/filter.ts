import { FILTER_VALUES } from '../constants';

export type TaskFilter = (typeof FILTER_VALUES)[keyof typeof FILTER_VALUES];
