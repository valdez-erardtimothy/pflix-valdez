import {
  transitions,
  positions
} from 'react-alert';
import BasicAlertTemplate from 'react-alert-template-basic';

const TIMEOUT_SECONDS = 5;
// options for react alert
export default {
  position: positions.TOP_CENTER,
  timeout: TIMEOUT_SECONDS*1000,
  transition: transitions.SCALE,
  template: BasicAlertTemplate
};