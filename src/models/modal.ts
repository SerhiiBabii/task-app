import { MODAL_TYPES } from '../constants/modal';

export type ModalTypes = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
