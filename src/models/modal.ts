import { MODAL_TYPES } from '../constants';

export type ModalTypes = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
