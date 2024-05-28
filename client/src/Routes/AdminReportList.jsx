import { useState, useEffect } from "react";
import AdminHeader from "../Components/AdminHeader";
import Footer from "../Components/Footer";
import TextModal from "../Components/TextModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const AdminReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reports");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const reportsData = await response.json();

        const fetchUserInfo = async (userId) => {
          const response = await fetch(
            `http://localhost:3000/api/users/${userId}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch user info for userId: ${userId}`);
          }
          return response.json();
        };

        const fetchAccommodationInfo = async (accommodationId) => {
          const response = await fetch(
            `http://localhost:3000/api/accommodations/${accommodationId}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch accommodation info for accommodationId: ${accommodationId}`
            );
          }
          return response.json();
        };

        const reportsWithDetails = await Promise.all(
          reportsData.map(async (report) => {
            const reportingUser = await fetchUserInfo(report.reporting_user);
            const reportedUser = await fetchUserInfo(report.reported_user);
            const accommodation = await fetchAccommodationInfo(
              report.reported_accommodation
            );
            
            return {
              ...report,
              reportingUser,
              reportedUser,
              accommodation,
            };
          })
        );

        setReports(reportsWithDetails);
        console.log(reports);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const removeReport = async (reportId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reports/${reportId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the report");
      }
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportId)
      );
    } catch (error) {
      console.error("Error removing report:", error);
      alert("Failed to remove the report. Please try again.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading reports...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>Error: {error}</p>;
  }

  return (
    <>
      <AdminHeader />
      <div className='the-Stats'>
        <Link className="link-decoration" to="/AdminStats"><div className='users-stats'>USERS </div> </Link>
        <Link className="link-decoration" to="/AccommodationsStats"><div className='accommodations-Stats'>ACCOMMODATIONS </div> </Link>
        <Link className="link-decoration" to="/reports"><div className='users-statsA'>REPORTS </div> </Link>
      </div>
      <div className="admin">
        <main>
          {reports.length === 0 ? (
            <p style={{ textAlign: "center" }}>No results found</p>
          ) : (
            reports.map((report) => (
              <div key={report.id}>
                <div className="reportcard">
                  <div className="report-details">
                    <img
                      src={
                        "http://localhost:3000/" +
                        JSON.parse(report.accommodation.pictures)[0]
                      }
                      className="reported-house-image"
                      alt="Reported Accommodation"
                      onClick={() =>
                        navigate("/listings/" + report.accommodation.id)
                      }
                    />

                    {}
                    <div className="report-info">
                      <div className="who">
                        From:&nbsp;
                        <p
                          onClick={() =>
                            navigate("/profile/" + report.reportingUser.id)
                          }
                        >
                          {report.reportingUser.first_name +
                            " " +
                            report.reportingUser.last_name}
                        </p>
                        To:&nbsp;
                        <p
                          onClick={() =>
                            navigate("/profile/" + report.reportedUser.id)
                          }
                        >
                          {report.reportedUser.first_name +
                            " " +
                            report.reportedUser.last_name}
                        </p>
                      </div>
                      <p className="report-type">
                        Reason: {report.report_reason}
                      </p>
                      <p className="report-text">
                        Text:
                        {report.report_text === "" ? (
                          <span> none</span>
                        ) : (
                          <TextModal
                            modalTitle={report.report_text}
                            modalContent={report.report_text}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="response-report">
                    <button
                      className="remove-report"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to remove this report?")
                        ) {
                          removeReport(report.id);
                        }
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminReportList;
