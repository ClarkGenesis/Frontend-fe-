import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/UserBreadcrums";
import Header from "../../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../../layouts/UserLayouts/UserSidemenu";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import { useAuth } from "../../../contexts/AuthContext";
import PageLoading from "../../../components/PageLoading";

// Interface for application data
interface PendingApplication {
  id: number;
  status: string;
  updated_at: string;
  personal_first_name: string;
  personal_last_name: string;
  application_type?: string;
}

function Pendings() {
  const { user } = useAuth();
  const [latestPending, setLatestPending] = useState<PendingApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the latest pending application
  useEffect(() => {
    const fetchLatestPending = async () => {
      try {
        if (!user) return;

        setLoading(true);
        const response = await api.get('/user/application-requests');
        
        if (response.data && response.data.length > 0) {
          // Process applications to get status entries
          const pendingApplications = response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .flatMap((app: any) => {
              if (app.status) {
                // Extract status and timestamp
                const statusEntries = app.status.split(',').map((statusEntry: string) => {
                  const [status, timestamp] = statusEntry.split('|');
                  return {
                    id: app.id,
                    status: status.trim(),
                    updated_at: timestamp.trim(),
                    personal_first_name: app.personal_first_name || '',
                    personal_last_name: app.personal_last_name || '',
                    application_type: 'Loan Application' // Default type
                  };
                });
                
                // Return only entries with Pending status
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return statusEntries.filter((entry: any) => entry.status === 'Pending');
              }
              return [];
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

          // Set only the latest pending application
          setLatestPending(pendingApplications.length > 0 ? pendingApplications[0] : null);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load pending applications');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPending();
  }, [user]);

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <Breadcrumb 
          title="Pending Application" 
          active="Pending Application"
        />

        <div className="xxl:col-span-9 col-span-12">
          <div className="box overflow-hidden main-content-card">
            <div className="box-body p-6">
              {loading ? (
                <PageLoading />
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              ) : !latestPending ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <div className="text-gray-400 text-5xl mb-4">
                    <i className="bi bi-inbox"></i>
                  </div>
                  <p className="text-gray-600 mb-4">You don't have any pending applications</p>
                  <Link to="/application" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Start New Application
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-5 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">Pending Review</h3>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        {latestPending.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-yellow-600">
                        <i className="bi bi-hourglass-split text-2xl"></i>
                        <span className="font-medium">Submitted Date: {new Date(latestPending.updated_at).toLocaleString()}</span>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-800 font-semibold">Your registration is currently under review.</p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <h6 className="text-gray-800 mb-2">Next Steps:</h6>
                        <p className="text-gray-700">
                          Please wait for further updates. Our team is reviewing your application.
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
                        <div className="flex items-center gap-2">
                          <i className="bi bi-clock-history text-gray-600"></i>
                          <span className="text-gray-600">Typical response time: 1-3 business days</span>
                        </div>
                        <div className="bg-yellow-200 w-32 h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 w-1/2 h-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="bi bi-question-circle-fill text-blue-500 mr-2"></i>
                            <span>Need assistance?</span>
                          </div>
                          <Link to="/SupportHelp" className="text-blue-600 hover:text-blue-800 font-medium">
                            Contact Support
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pendings;