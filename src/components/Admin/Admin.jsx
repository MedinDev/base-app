import React, {useState} from 'react';
import Chart from 'chart.js/auto';

const Admin = () => {
    const [isSideNavVisible] = useState(false);

    const initializeCharts = () => {

        new Chart(document.getElementById('usersChart'), {
            type: 'doughnut',
            data: {
                labels: ['New', 'Registered'],
                datasets: [{
                    data: [30, 65],
                    backgroundColor: ['#00F0FF', '#8B8B8D'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                }
            }
        });

        // Gráfica de Comercios
        new Chart(document.getElementById('commercesChart'), {
            type: 'doughnut',
            data: {
                labels: ['New', 'Registered'],
                datasets: [{
                    data: [60, 40],
                    backgroundColor: ['#FEC500', '#8B8B8D'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                }
            }
        });
    };

    // Initialize charts when component mounts
    React.useEffect(() => {
        initializeCharts();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 flex flex-wrap">
                <div className={`p-2 bg-white w-full md:w-60 flex flex-col md:flex ${isSideNavVisible ? '' : 'hidden'}`}
                     id="sideNav">
                    <nav>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                           href="/">
                            <i className="fas fa-home mr-2"></i>Real Estate
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                           href="/">
                            <i className="fas fa-file-alt mr-2"></i>House list
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                           href="/">
                            <i className="fas fa-users mr-2"></i>Users List
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                           href="/">
                            <i className="fas fa-store mr-2"></i>booking list
                        </a>
                        <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                           href="/">
                            <i className="fas fa-exchange-alt mr-2"></i>Owner list
                        </a>
                    </nav>
                    <a className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto"
                       href="/">
                        <i className="fas fa-sign-out-alt mr-2"></i>Theme
                    </a>
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
                    <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">Copyright WCSLAT@2023</p>
                </div>
                <div className="flex-1 p-4 w-full md:w-3/4 lg:w-4/5 xl:w-5/6">
                    <div className="relative max-w-md w-full">
                        <div className="absolute top-1 left-2 inline-flex items-center p-2">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                            type="search" placeholder="Buscar..."/>
                    </div>
                    <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-full lg:w-1/2 xl:w-1/3">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <div className="chart-container"
                                 style={{position: 'relative', height: '150px', width: '100%'}}>
                                <canvas id="usersChart"></canvas>
                            </div>
                        </div>
                        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                            <h2 className="text-gray-500 text-lg font-semibold pb-1">Comercios</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <div className="chart-container"
                                 style={{position: 'relative', height: '150px', width: '100%'}}>
                                <canvas id="commercesChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-4 shadow rounded-lg">
                        <h2 className="text-gray-500 text-lg font-semibold pb-4">Autorizaciones Pendientes</h2>
                        <div className="my-1"></div>
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                        <table className="w-full table-auto text-sm">
                            <thead>
                            <tr className="text-sm leading-normal">
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Images</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">booking
                                    Number
                                </th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Check-in</th>
                                <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Check-out</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-grey-lighter">
                                <td className="py-2 px-4 border-b border-grey-light"><img
                                    src="https://via.placeholder.com/40" alt="Foto Perfil"
                                    className="rounded-full h-10 w-10"/></td>
                                <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
                                <td className="py-2 px-4 border-b border-grey-light">12/06/2023</td>
                                <td className="py-2 px-4 border-b border-grey-light">19/06/2024</td>

                            </tr>
                            {/* More rows */}
                            </tbody>
                        </table>
                        <div className="text-right mt-4">
                            <button
                                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                                Ver más
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-4 shadow rounded-lg">
                        <div className="bg-white p-4 rounded-md mt-4">
                            <h2 className="text-gray-500 text-lg font-semibold pb-4">Transacciones</h2>
                            <div className="my-1"></div>
                            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                            <table className="w-full table-auto text-sm">
                                <thead>
                                <tr className="text-sm leading-normal">
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
                                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Monto</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="hover:bg-grey-lighter">
                                    <td className="py-2 px-4 border-b border-grey-light">Carlos Sánchez</td>
                                    <td className="py-2 px-4 border-b border-grey-light">27/07/2023</td>
                                    <td className="py-2 px-4 border-b border-grey-light text-right">$1500</td>
                                </tr>
                                {/* More rows */}
                                </tbody>
                            </table>
                            <div className="text-right mt-4">
                                <button
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                                    Ver más
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
