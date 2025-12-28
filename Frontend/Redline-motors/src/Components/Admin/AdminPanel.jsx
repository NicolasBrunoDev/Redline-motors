import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const fetchUsers = () => {
        setLoading(true);
        fetch("http://localhost:8080/api/users/all")
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(data => {
                // VALIDACIÓN CLAVE: Si data no es un array, lo convertimos en uno vacio (Enserio, es importante)
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Los datos recibidos no son una lista:", data);
                    setUsers([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setUsers([]); // Evita que users sea null
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
            try {
                const res = await fetch(`http://localhost:8080/api/users/delete/${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    alert("Usuario eliminado con éxito");
                    fetchUsers(); // Recargamos la tabla
                }
            } catch (err) {
                alert("Error al conectar con el servidor");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black pt-28 px-10 text-white">
            {/* Header del Panel */}
            <div className="flex justify-between items-center mb-8 bg-gray-900/50 p-8 rounded-3xl border border-white/5">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">
                        System <span className="text-red-700 underline decoration-red-700/50">Admin</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Control total de usuarios y flota Redline</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Estado Servidor</p>
                    <p className="text-green-500 font-mono text-sm animate-pulse">●  ONLINE</p>
                </div>
            </div>

            {/* Tabla de Gestión */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-red-700 text-white uppercase text-xs">
                            <th className="p-4">Identificador</th>
                            <th className="p-4">Nombre Completo</th>
                            <th className="p-4">Correo Electrónico</th>
                            <th className="p-4">Rango</th>
                            <th className="p-4 text-center">Gestión</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {/* Validamos que users sea un array y tenga contenido antes de hacer .map */}
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((u) => (
                                <tr key={u.id} className="hover:bg-white/5 transition-all">
                                    <td className="p-4 text-gray-500 font-mono text-xs">ID-{u.id}</td>
                                    <td className="p-4 font-bold">{u.name}</td>
                                    <td className="p-4 text-gray-400 italic">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-black ${u.role === 'ADMIN' ? 'bg-red-700 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {u.id !== currentUser?.id ? (
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="bg-red-700/10 text-red-700 hover:bg-red-700 hover:text-white px-4 py-1 rounded-lg text-xs font-bold transition-all border border-red-700/20"
                                            >
                                                BANEAR USUARIO
                                            </button>
                                        ) : (
                                            <span className="text-gray-600 text-xs italic font-medium">Tú (Protegido)</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            /* Si no hay datos, mostramos una fila informativa en lugar de romper la web */
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500 italic">
                                    {loading ? "Cargando registros..." : "No se encontraron usuarios en la base de datos."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading && <div className="p-20 text-center text-red-700 font-bold animate-bounce uppercase">Sincronizando base de datos...</div>}
            </div>
        </div>
    );
};

export default AdminPanel;