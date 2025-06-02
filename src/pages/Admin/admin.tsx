import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Breadcrumb from "../../components/AdminBreadcrums";
import Header from "../../layouts/AdminLayouts/AdminHeader";
import Sidemenu from "../../layouts/AdminLayouts/AdminSidemenu";
import User_avatar1 from '../../assets/images/faces/11.jpg';
import PageLoading from '../../components/PageLoading';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState({ total: 0, deleted: 0 });
  const [statusCounts, setStatusCounts] = useState({ Newpending: 0, pending: 0, approved: 0, disapproved: 0 });
  const [pendingRegistrations, setPendingRegistrations] = useState<{ id: number; name: string; date: string; status: string }[]>([]);
  const [approvedRegistrations, setApprovedRegistrations] = useState<{ id: number; name: string; date: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const users = response.data.users;
        const deletedCount = users.filter((user: { status: string }) => user.status === 'Delete Account').length;
        setTotalUsers({ total: users.length, deleted: deletedCount });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await api.get('/application-requests');
        const applications = response.data;

        const pending = applications.filter((app: { status: string }) => app.status?.includes('Pending'));
        const approved = applications.filter((app: { status: string }) => app.status?.includes('Approved'));
        const disapproved = applications.filter((app: { status: string }) => app.status?.includes('Disapproved')).length;

        setStatusCounts({ Newpending: pending.length, pending: pending.length, approved: approved.length, disapproved });

        // Extract pending registrations
        const pendingList = pending.map((app: { id: number; user: { name: string }; created_at: string; status: string }) => ({
          id: app.id,
          name: app.user.name,
          date: new Date(app.created_at).toLocaleDateString(),
          status: 'Pending',
        }));

        setPendingRegistrations(pendingList);

        // Extract approved registrations
        const approvedList = approved.map((app: { id: number; user: { name: string }; created_at: string; status: string }) => ({
          id: app.id,
          name: app.user.name,
          date: new Date(app.created_at).toLocaleDateString(),
          status: 'Approved',
        }));

        setApprovedRegistrations(approvedList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application statuses:', error);
        setLoading(false);
      }
    };

    fetchStatusCounts();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentDate = format(new Date(), 'MMMM d, yyyy');
    const currentTime = format(new Date(), 'h:mm a');

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dashboard Report - ${currentDate}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e2e8f0;
            }
            .report-date {
              color: #666;
              font-size: 14px;
              margin-top: 10px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #1a365d;
              margin-bottom: 15px;
              padding-bottom: 5px;
              border-bottom: 1px solid #e2e8f0;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .metric-card {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
            }
            .metric-title {
              font-weight: bold;
              color: #4a5568;
              margin-bottom: 5px;
            }
            .metric-value {
              font-size: 24px;
              color: #2d3748;
              margin-bottom: 5px;
            }
            .metric-subtext {
              font-size: 12px;
              color: #718096;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-size: 14px;
            }
            th {
              background: #f8fafc;
              padding: 12px;
              text-align: left;
              font-weight: bold;
              color: #4a5568;
              border-bottom: 2px solid #e2e8f0;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
            }
            .status-pending {
              background: #fef3c7;
              color: #92400e;
            }
            .status-approved {
              background: #dcfce7;
              color: #166534;
            }
            @media print {
              body {
                margin: 20px;
              }
              .no-break {
                break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Dashboard Summary Report</h1>
            <div class="report-date">Generated on ${currentDate} at ${currentTime}</div>
          </div>

          <div class="section">
            <h2 class="section-title">Summary Metrics</h2>
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-title">Total Users</div>
                <div class="metric-value">${totalUsers.total}</div>
                <div class="metric-subtext">${totalUsers.deleted} deleted accounts</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Total Motorcycles Listed</div>
                <div class="metric-value">15</div>
                <div class="metric-subtext">Active listings</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">New Application Requests</div>
                <div class="metric-value">${statusCounts.Newpending}</div>
                <div class="metric-subtext">New requests</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Pending Approvals</div>
                <div class="metric-value">${statusCounts.pending}</div>
                <div class="metric-subtext">Awaiting review</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Approved Applications</div>
                <div class="metric-value">${statusCounts.approved}</div>
                <div class="metric-subtext">Successfully approved</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Disapproved Applications</div>
                <div class="metric-value">${statusCounts.disapproved}</div>
                <div class="metric-subtext">Not approved</div>
              </div>
            </div>
          </div>

          <div class="section no-break">
            <h2 class="section-title">Recent Registrations</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${pendingRegistrations.map(reg => `
                  <tr>
                    <td>#${reg.id}</td>
                    <td>${reg.name}</td>
                    <td>${reg.date}</td>
                    <td><span class="status-badge status-pending">${reg.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section no-break">
            <h2 class="section-title">Recent Approved Registrations</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${approvedRegistrations.map(reg => `
                  <tr>
                    <td>#${reg.id}</td>
                    <td>${reg.name}</td>
                    <td>${reg.date}</td>
                    <td><span class="status-badge status-approved">${reg.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.print();
      // Optional: Close the window after printing
      // printWindow.onafterprint = () => printWindow.close();
    };
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb />

          {/* Welcome & Metrics Section */}
          <div className="grid grid-cols-12 gap-6 mb-4">
            {/* Welcome Section */}
            <div className="col-span-2 md:col-span-12 w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-center p-2">
                  <img
                    src={User_avatar1}
                    alt="User Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-2"
                  />
                  <h6 className="text-gray-800 font-medium mb-0.5">Welcome Back!</h6>
                  <p className="text-gray-600 font-semibold text-sm">Admin</p>
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="col-span-9 md:col-span-12">
              <div className="box overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-5">Summary Reports</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { 
                        icon: "bi bi-people-fill",
                        label: "Total Users",
                        details: `${totalUsers.total}`,
                        subtext: `${totalUsers.deleted} deleted`,
                        bgColor: "bg-blue-50",
                        iconColor: "text-blue-500",
                        isIncrease: true
                      },
                      { 
                        icon: "bi bi-bicycle",
                        label: "Total Motorcycles Listed",
                        details: "15",
                        subtext: "Active listings",
                        bgColor: "bg-purple-50",
                        iconColor: "text-purple-500",
                        isIncrease: true
                      },
                      { 
                        icon: "bi bi-file-earmark-text",
                        label: "New Application Requests",
                        details: statusCounts.Newpending,
                        subtext: "New requests",
                        bgColor: "bg-pink-50",
                        iconColor: "text-pink-500",
                        isIncrease: true
                      },
                      { 
                        icon: "bi bi-clock-fill",
                        label: "Pending Approvals",
                        details: statusCounts.pending,
                        subtext: "Awaiting review",
                        bgColor: "bg-yellow-50",
                        iconColor: "text-yellow-500",
                        isIncrease: false
                      },
                      { 
                        icon: "bi bi-check-circle-fill",
                        label: "Approved Applications",
                        details: statusCounts.approved,
                        subtext: "Successfully approved",
                        bgColor: "bg-green-50",
                        iconColor: "text-green-500",
                        isIncrease: true
                      },
                      { 
                        icon: "bi bi-x-circle-fill",
                        label: "Disapproved Applications",
                        details: statusCounts.disapproved,
                        subtext: "Not approved",
                        bgColor: "bg-red-50",
                        iconColor: "text-red-500",
                        isIncrease: false
                      },
                    ].map((metric, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-sm border-2 border-black">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-1 ${metric.bgColor} rounded-lg`}>
                            <i className={`${metric.icon} ${metric.iconColor} text-xl`}></i>
                          </div>
                          <h3 className="text-gray-700 font-medium text-lg">{metric.label}</h3>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-semibold text-gray-800">{metric.details}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{metric.subtext}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={handlePrint}
                      className="px-4 py-2 bg-gray-600 text-white text-base rounded hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <i className="bi bi-printer text-base"></i>
                      Print Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Recent Registrations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recent Registrations</h3>
              </div>
              
              {pendingRegistrations.length === 0 ? (
                <div className="text-center py-6 text-gray-500">No pending registrations found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pendingRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-blue-600 font-medium">#{reg.id}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                                {reg.name.charAt(0)}
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">{reg.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{reg.date}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-600">
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Approved Registrations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recent Approved Registrations</h3>
              </div>

              {approvedRegistrations.length === 0 ? (
                <div className="text-center py-6 text-gray-500">No approved registrations found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {approvedRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-blue-600 font-medium">#{reg.id}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                                {reg.name.charAt(0)}
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">{reg.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{reg.date}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
