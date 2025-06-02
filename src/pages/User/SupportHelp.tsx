import Breadcrumb from "../../components/UserBreadcrums";
import Header from "../../layouts/UserLayouts/UserHeader";
import Sidemenu from "../../layouts/UserLayouts/UserSidemenu";

function SupportHelp() {
  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb title="Support & Help" active="Support & Help" />
          <div className="box-body p-8">
            <div className="flex justify-center items-center min-h-[60vh] py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
                {/* Contact Us Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Contact Us
                  </h2>
                  <div className="space-y-6">
                    {/* Phone Contact */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                      <div className="bg-red-100 p-3 rounded-full">
                        <i className="bi bi-phone text-red-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Call Us:</p>
                        <p className="font-bold text-gray-900 text-lg">(+63) 9173077038</p>
                      </div>
                    </div>

                    {/* Email Contact */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                      <div className="bg-red-100 p-3 rounded-full">
                        <i className="bi bi-envelope text-red-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email Us:</p>
                        <a
                          className="text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors duration-300"
                          rel="noopener noreferrer"
                        >
                          support@premio.ph
                        </a>
                      </div>
                    </div>

                    {/* Location Contact */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                      <div className="bg-red-100 p-3 rounded-full">
                        <i className="bi bi-geo-alt text-red-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Location:</p>
                        <p className="font-bold text-gray-900 text-lg">
                          Zone-12 Poblacion Tagoloan Misamis Oriental
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Quick Links
                  </h2>
                  <div className="space-y-6">
                    {/* FAQs Link */}
                    <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                      <div className="bg-red-100 p-3 rounded-full">
                        <i className="bi bi-question-circle text-red-600 text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">FAQs:</p>
                        <a
                          href="https://cdn.easyfaq.io/faq/8ut2qRSMAITMDzuRufRP"
                          className="text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Check FAQs
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupportHelp;
