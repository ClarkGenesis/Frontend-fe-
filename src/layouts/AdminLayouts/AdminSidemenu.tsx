import logo3 from '../../assets/photos/logo1.png'
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';

function Sidemenu() {
    const { isCollapsed: sidebarCollapsed } = useSidebar();

    return (
        <>
            <aside className={`app-sidebar ${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`} id="sidebar">
                <div className="main-sidebar-header">
                    <a href=''>
                        <center>
                            <img 
                                src={logo3} 
                                className={`
                                    transparent-shadow transition-all duration-300
                                    ${sidebarCollapsed ? 'max-h-12' : 'max-h-32'}
                                `} 
                            />
                        </center>
                    </a>
                </div>
                <div className='main-sidebar' id="sidebar-scroll">
                    <nav className="main-menu-container nav nav-pills flex-col sub-open">
                        <div className='slide-left' id='slide-left'>
                        </div>
                        <ul className='main-menu pt-5'>
                            <li className={`slide__category ${sidebarCollapsed ? 'hidden' : ''}`}>
                                <span className='category-name'>Main</span>
                            </li>
                            <li className='slide'>
                                <Link to="/admin" className={`
                                    side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg 
                                    text-white bg-gray-200 hover:transition duration-300 ease-in-out shadow-md
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                `}>
                                    <i className='side-menu__icon bi bi-layout-text-window-reverse color text-xl'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label text-blue-900'>
                                            Dashboard
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className={`${sidebarCollapsed ? 'py-1' : 'p-2'}`}></div>
                            <li className='slide'>
                                <Link to="/user-management" className={`
                                    side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg 
                                    text-white bg-gray-200 hover:transition duration-300 ease-in-out shadow-md
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                `}>
                                    <i className='side-menu__icon bi bi-people text-xl'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            User management
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className={`${sidebarCollapsed ? 'py-1' : 'p-2'}`}></div>
                            <li className='slide'>
                                <Link to="/ApplicationRequest" className={`
                                    side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg 
                                    text-white bg-gray-200 hover:transition duration-300 ease-in-out shadow-md
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                `}>
                                    <i className='side-menu__icon bi bi-journal-text text-xl'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            Application requests
                                        </span>
                                    )}
                                </Link>
                            </li>

                            <div className={`${sidebarCollapsed ? 'py-1' : 'p-2'}`}></div>
                            <li className='slide'>
                                <Link to="/admin-motorcycles" className={`
                                    side-menu__item flex items-center gap-2 px-4 py-3 rounded-lg 
                                    text-white bg-gray-200 hover:transition duration-300 ease-in-out shadow-md
                                    ${sidebarCollapsed ? 'justify-center' : ''}
                                `}>
                                    <i className='side-menu__icon bi bi-bicycle text-xl'></i>
                                    {!sidebarCollapsed && (
                                        <span className='side-menu__label'>
                                            Motorcycles
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

export default Sidemenu;
