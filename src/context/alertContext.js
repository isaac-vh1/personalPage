import {createContext, useContext, useState, useCallback} from "react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    // Type can be either "success" or "error"
    type: 'success',
    // Message to be displayed, can be any string
    message: '',
  });

    const onOpen = useCallback((type, message) => {
        setState({ isOpen: true, type, message });
    }, []);

    const onClose = useCallback(() => {
        setState({ isOpen: false, type: "", message: "" });
    }, []);


    return (
    <AlertContext.Provider
      value={{
          ...state, onOpen, onClose
          // ...state,
        // onOpen: (type, message) => setState({ isOpen: true, type, message }),
        // onClose: () => setState({ isOpen: false, type: '', message: '' }),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
