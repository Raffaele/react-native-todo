const EVENT_PREFIX = 'TODO';

const EVENT_NAMES = ['ADD', 'REMOVE', 'SWITCH_STATE', 'UPDATE_LABEL'];
function mapEventNames (prefix, eventNames) {
    const mapped = eventNames.reduce((result,evtName) => ({
            ...result,
            [evtName]: `${prefix}:${evtName}`
        }), {});

    return Object.freeze(mapped);
}

export const EVENTS = mapEventNames(EVENT_PREFIX, EVENT_NAMES);

export function todos(state = [], action) {
    switch (action.type) {
        case EVENTS.ADD:
            return [...state, {
                label: action.text,
                done: false
            }];
        case EVENTS.REMOVE:
            return state.filter((_, i) => i !== action.id);
        case EVENTS.SWITCH_STATE:
            return state.map((todoItem, todoIndex) => {
                return todoIndex !== action.id ?
                    todoItem :
                    {...todoItem, done: !todoItem.done}
            });
        case EVENTS.UPDATE_LABEL:
            return state.map((todoItem, todoIndex) => {
                return todoIndex !== action.id ?
                    todoItem :
                    {...todoItem, label: action.label}
            });
        default:
            return state
    }
}