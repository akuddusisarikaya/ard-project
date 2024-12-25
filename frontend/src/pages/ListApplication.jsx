import React from "react";
import ListingApps from "../components/ListingApps";
import storeAPI from "../store/storeAPI";

export default function ListApplication() {
  const timeoutRef = React.useRef(null);
  // Başvuru verileri
  const [applications, setApplications] = React.useState([]);
  const { fetchData } = storeAPI();
  const [loading, setLoading] = React.useState(false);

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const response = await fetchData("/admin/getcasebleapplications", "GET");
      if (response === 401) {
        window.location.reload();
      }
      setApplications(response);
      clearTimeout(timeoutRef.current);
    } catch (error) {
      window.location.reload();
      console.error(error);
    } finally {
      clearTimeout(timeoutRef.current);
      setLoading(false);
    }
  };
  React.useState(() => {
    timeoutRef.current = setTimeout(() => {
      window.location.reload(); // 10 saniye sonunda sayfayı yenile
    }, 10000);

    fetchAllApplications();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });
  return (
    <ListingApps
      name={"Başvuru"}
      applications={applications}
      loading={loading}
    />
  );
}
