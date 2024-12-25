import React from "react";
import ListingApps from "../components/ListingApps";
import storeAPI from "../store/storeAPI";
import { useNavigate } from "react-router-dom";

export default function ListApplication() {
  const navigate = useNavigate();
  // Başvuru verileri
  const [applications, setApplications] = React.useState([]);
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);
  React.useState(() => {
    const fetchAllApplications = async () => {
      setLoading(true);
      try {
        const response = await fetchData("/admin/getcasebleapplications", "GET");
        if(response === 401) {
          navigate(0)
        }
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
