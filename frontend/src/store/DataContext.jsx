import React from "react";

export const DataContext = React.createContext();

export function DataProvider({ children }) {
  const [data, setData] = React.useState({
    docs : "",
    links : "",
    dataForm : "",
  });

  const updateData = (key, value) => {
    setData((prevData) => ({
        ...prevData,
        [key]: value,
    }));
};

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}