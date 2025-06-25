
import { createContext, useContext, useReducer } from 'react';

const DashboardContext = createContext();

const initialState = {
  selectedCountry: 'India',
  activeFilters: [],
  loading: false,
  error: null,
  data: {
    schemes: null,
    consumer: null,
    problems: null
  }
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DATA':
      return { 
        ...state, 
        data: { ...state.data, [action.dataType]: action.payload }
      };
    default:
      return state;
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setCountry = (country) => {
    dispatch({ type: 'SET_COUNTRY', payload: country });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setData = (dataType, data) => {
    dispatch({ type: 'SET_DATA', dataType, payload: data });
  };

  return (
    <DashboardContext.Provider value={{
      ...state,
      setCountry,
      setFilters,
      setLoading,
      setError,
      setData
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
