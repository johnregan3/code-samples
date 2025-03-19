export const defaultState = {
	currentStep: 1,
	error: null,
	isConnecting: false,
	connectAction: '',
	connectLink: '',
	connectionExists: false,
	linkExpired: false,
};

export const reducer = ( state = defaultState, action ) => {
	switch ( action.type ) {
		case 'BEGIN_ONBOARDING': {
			return {
				...state,
				currentStep: 2,
			};
		}
		case 'CONNECTION_START': {
			return {
				...state,
				isConnecting: true,
			};
		}
		case 'CONNECTION_EXISTS': {
			return {
				...state,
				isConnecting: false,
				currentStep: 3,
				connectLink: action.dashboardLink,
				connectionExists: true,
			};
		}
		case 'CONNECTION_SUCCESS': {
			return {
				...state,
				isConnecting: false,
				currentStep: 3,
				connectLink: action.connectLink,
			};
		}
		case 'CONNECTION_PROGRESS': {
			return {
				...state,
				connectAction: action.action,
			};
		}
		case 'CONNECTION_FAILED': {
			return {
				...state,
				isConnecting: false,
				error: action.error,
			};
		}
		case 'EXPIRE_LINK': {
			return {
				...state,
				linkExpired: true,
			};
		}
	}
};
