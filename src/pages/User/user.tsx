import Breadcrumb from "../../components/UserBreadcrums";
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";
import User_avatar from "../../assets/photos/user-avatar.png";
import Featured1 from "../../layouts/UserLayouts/FeaturedMotorcycles";
import { useAuth } from "../../contexts/AuthContext";
import background10 from "../../assets/photos/bg-products.png";
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import PageLoading from '../../components/PageLoading';
import { printApplicationForm } from '../../components/PrintForm';

interface StatusEntry {
    id: string;
    status: 'Approved' | 'Disapproved' | 'Pending';
    updated_at: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any; // Add details field for print functionality
}

const Dashboard = () => {
  const { user } = useAuth();
  const [statusHistory, setStatusHistory] = useState<StatusEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusHistory = async () => {
      try {
        if (!user) return;

        const response = await api.get('/user/application-requests');
        if (response.data.length > 0) {
          const statuses = response.data.flatMap((application: { id: number; status: string; }) => {
            if (application.status) {
              const statusEntries = application.status.split(',').map((statusEntry: string, index: number) => {
                const [status, timestamp] = statusEntry.split('|');
                return {
                  id: `${application.id}-${index}`,
                  status: status.trim() as 'Approved' | 'Disapproved' | 'Pending',
                  updated_at: timestamp.trim(),
                  details: application // Include the full application details
                };
              });
              // Only return the latest status
              return statusEntries.slice(-1);
            }
            return [];
          });
          setStatusHistory(statuses);
        }
      } catch (err) {
        setError('Failed to load status history');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusHistory();
  }, [user]);

  if (loading) return <PageLoading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      {/* Main container with background */}
      <div 
        className="min-h-screen relative"
        style={{ 
          backgroundImage: `url(${background10})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          backgroundSize: '160%'
        }}
      >
        {/* Content wrapper with semi-transparent background */}
        <div className="relative min-h-screen bg-white/90">
          <Header />
          <Sidemenu />
          
          <div className="main-content app-content">
            <div className="container-fluid p-2">
              <Breadcrumb />
              <div className="grid grid-cols-12 gap-6 mb-2">
                {/* Welcome Section */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  <div className="box overflow-hidden shadow-md rounded-lg">
                    <div className="box-body text-center p-6 bg-white">
                      <img
                        src={User_avatar}
                        alt="User Profile"
                        className="transparent-logo avatar-rounded mx-auto mb-4 w-24 h-24 object-cover"
                      />
                      <p className="text-gray-700 font-medium">
                        <i>Welcome back!</i>
                        <br />
                        <span className="font-bold text-gray-900">{user?.name}</span>
                      </p>
                    </div>
                  </div>

                  {/* Total Applications Summary Card */}
                  <div className="box overflow-hidden shadow-md rounded-lg mt-6">
                    <div className="box-body p-6 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            <i className="bi bi-card-checklist text-blue-600 mr-2"></i>
                          </span>
                          <span className="text-gray-700 font-medium">Total Applications:</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{statusHistory.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status History Section */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9">
                  <div className="box overflow-hidden shadow-md rounded-lg">
                    <div className="box-body p-4 bg-white">
                      <div className="status-section bg-white rounded-lg">
                        <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 px-2">
                          <i className="bi bi-info-circle text-blue-500"></i>
                          <span>Application Status</span>
                        </h5>

                        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" 
                             style={{ height: '280px' }}>
                          {statusHistory.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-lg mx-2">
                              <p className="text-gray-500">No application status updates available</p>
                            </div>
                          ) : (
                            <div className="space-y-3 px-2">
                              {statusHistory.map((entry) => (
                                <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                  <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold">Application Status</h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      entry.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                      entry.status === 'Disapproved' ? 'bg-red-100 text-red-800' : 
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {entry.status}
                                    </span>
                                  </div>

                                  <div className="border-t border-gray-200 pt-3">
                                    {entry.status === 'Approved' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-green-600">
                                          <i className="bi bi-check-circle-fill text-2xl"></i>
                                          <span className="font-medium">Approval Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                        </div>
                                        
                                        <div className="bg-green-50 p-4 rounded-lg">
                                          <p className="text-green-800 font-semibold">Congratulations! Your registration has been approved.</p>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                          <h6 className="text-blue-800 mb-2">Next Steps:</h6>
                                          <p className="text-blue-700">
                                            Please visit our office at Zone-12 Poblacion Tagoloan Misamis Oriental with the
                                            necessary documents to complete the process,
                                            bring the credit requirements, and print the Credit Application Form.
                                          </p>
                                        </div>
                                        
                                        <button
                                          onClick={() => printApplicationForm(entry.details)}
                                          className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 shadow-md"
                                        >
                                          <i className="bi bi-printer-fill"></i>
                                          Print Credit Application Form
                                        </button>

                                        <div className="mt-6">
                                          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                            <i className="bi bi-journal-text text-blue-600"></i> 
                                            Credit Requirements
                                          </h3>
                                          <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                                            <ul className="space-y-3">
                                              <li className="flex items-center gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                  <i className="bi bi-person-fill"></i>
                                                </div>
                                                <span><b>2x2 ID Picture</b> (For both Buyer and Co-maker)</span>
                                              </li>
                                              <li className="flex items-center gap-3">
                                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                                  <i className="bi bi-cash-stack"></i>
                                                </div>
                                                <span><b>Proof of Income</b> (Payslips, Certificate of Employment, or Income Tax Return)</span>
                                              </li>
                                              <li className="flex items-center gap-3">
                                                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                                                  <i className="bi bi-house-door-fill"></i>
                                                </div>
                                                <span><b>Residence Certificate / Cedula</b> (Issued by your local government unit)</span>
                                              </li>
                                              <li className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                                  <i className="bi bi-receipt"></i>
                                                </div>
                                                <span><b>Proof of Billing</b> (Latest utility bill showing your current address)</span>
                                              </li>
                                              <li className="flex items-center gap-3">
                                                <div className="bg-red-100 p-2 rounded-full text-red-600">
                                                  <i className="bi bi-geo-alt-fill"></i>
                                                </div>
                                                <span><b>Driver's License</b> (if applicable)</span>
                                              </li>
                                              <li className="flex items-center gap-3">
                                                <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                                                  <i className="bi bi-card-checklist"></i>
                                                </div>
                                                <span><b>Government-Issued IDs</b> (e.g., Passport, Voter's ID, or UMID)</span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {entry.status === 'Disapproved' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-red-600">
                                          <i className="bi bi-x-circle-fill text-xl"></i>
                                          <span className="font-medium text-sm">Disapproval Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                        </div>
                                        <div className="bg-red-50 p-3 rounded-lg">
                                          <p className="text-red-800 font-medium text-sm">
                                            We regret to inform you that your registration has been disapproved.
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {entry.status === 'Pending' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-yellow-600">
                                          <i className="bi bi-hourglass-split text-xl"></i>
                                          <span className="font-medium text-sm">Submitted Date: {new Date(entry.updated_at).toLocaleString()}</span>
                                        </div>
                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                          <p className="text-yellow-800 font-medium text-sm">
                                            Your registration is currently under review.
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <Featured1 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
