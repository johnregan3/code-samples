import { createContext, useContext, useReducer } from '@wordpress/element';

import { defaultState, reducer } from './reducer';

export const ProgressContext = createContext();

export const ProgressProvider = ( { children } ) => {
	const [ state, dispatch ] = useReducer( reducer, defaultState );

	return (
		<ProgressContext.Provider value={ { state, dispatch } }>
			{ children }
		</ProgressContext.Provider>
	);
};

export function useProgress() {
	const context = useContext( ProgressContext );

	if ( ! context ) {
		throw new Error( 'useProgress must be used within a ProgressProvider' );
	}

	return context;
}
