import React from "react";
import ListingApps from "../components/ListingApps";
import storeAPI from "../store/storeAPI";

export default function ListApplication() {
  // Başvuru verileri
  const [applications, setApplications] = React.useState([]);
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);
  React.useState(() => {
    const fetchAllApplications = async () => {
      setLoading(true);
      try {
        const response = await fetchData("/admin/getcasebleapplications", "GET");
        setApplications(response);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplications();
  });
  return (
      < ListingApps applications={applications} loading={loading} /> 
  );
}
