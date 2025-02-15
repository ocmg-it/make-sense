import {combineReducers} from 'redux';
import {labelsReducer} from './labels/reducer';
import {generalReducer} from './general/reducer';
import {aiReducer} from './ai/reducer';
import {notificationsReducer} from './notifications/reducer';
import {authReducer} from './auth/reducer';
import {performanceReducer} from './performance/reducer';

export const rootReducer = combineReducers({
    general: generalReducer,
    labels: labelsReducer,
    ai: aiReducer,
    notifications: notificationsReducer,
    auth: authReducer,
    performance: performanceReducer
});

export type AppState = ReturnType<typeof rootReducer>;
