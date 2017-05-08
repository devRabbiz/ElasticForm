import Immutable from 'immutable';

const $$initState = Immutable.fromJS({
    activeTabIndex: 0,
});

export const designViewReducer = ($$state = $$initState, action) => {
    console.log('action in designViewReducer', action);
    switch (action.type) {
        case 'CHANGE_ACTIVE_TAB_INDEX': {
            return $$state.set('activeTabIndex', action.payload)
        }
        default: return $$state;
    }
};
