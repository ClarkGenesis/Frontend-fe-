import logo2 from '../../assets/photos/logo1.png'
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';

function Sidemenu() {
    const { isCollapsed: sidebarCollapsed } = useSidebar();

    return (
        <>
            <aside className={`app-sidebar ${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`} id="sidebar">
                <div className="main-sidebar-header">
                    <center>
                        <img src={logo2} className='transparent-shadow' style={{ maxHeight: '500px' }} />
                    </center>
                </div>
                <div className='main-sidebar' id="sidebar-scroll">
                    <nav className="main-menu-container nav nav-pills flex-col sub-open ">
                        <div className='slide-left' id='slide-left'>
                        </div>
                        <ul className='main-menu pt-5'>
                            <li className='slide__category '><span className='category-name'>Main</span></li>
                            <li className='slide'>
                                <Link to="/user" className="side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-200 hover:bg-green-700 transition duration-300 ease-in-out shadow-md" onClick={() => window.scrollTo({ top: 0})}>
                                    <i className='w-6 h-4 side-menu__icon bi bi-layout-text-window-reverse color'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label text-blue-900'>
                                            Dashboard &ensp;
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className='p-2'></div>
                            <li className='slide'>
                                <Link to="/motorcycles" className="side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-200 hover:bg-green-300 transition duration-300 ease-in-out shadow-md" onClick={() => window.scrollTo({ top: 0})}>
                                    <i className='w-6 h-4 side-menu__icon bi bi-speedometer2'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            Motorcycles &ensp;
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className='p-2'></div>
                            <li className='slide'>
                                <Link to="/Status" className="side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-200 hover:bg-green-700 transition duration-300 ease-in-out shadow-md" onClick={() => window.scrollTo({ top: 0})}>
                                    <i className='w-4/5 side-menu__icon bi bi-journal-text'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            Application Status
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className='p-2'></div>
                            <li className='slide'>
                                <Link to="/SupportHelp" className="side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-200 hover:transition duration-300 ease-in-out shadow-md">
                                    <i className='w-6 h-4 side-menu__icon bi bi-question-circle'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            Support & Help
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidemenu
