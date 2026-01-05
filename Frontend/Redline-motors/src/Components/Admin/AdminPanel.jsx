import React, { useState, useEffect, useCallback } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cars, setCars] = useState([]); // Estado para la flota
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // CORRECCIÓN: Añadida la tercera respuesta 'resCars' al array
            const [resUsers, resCats, resCars] = await Promise.all([
                fetch("http://localhost:8080/api/users/all"),
                fetch("http://localhost:8080/api/categories/all"),
                fetch("http://localhost:8080/api/cars/all")
            ]);

            // Verificamos que las tres peticiones sean OK
            if (!resUsers.ok || !resCats.ok || !resCars.ok) throw new Error("Fallo en el servidor");

            const usersData = await resUsers.json();
            const catsData = await resCats.json();
            const carsData = await resCars.json();

            setUsers(Array.isArray(usersData) ? usersData : []);
            setCategories(Array.isArray(catsData) ? catsData : []);
            setCars(Array.isArray(carsData) ? carsData : []);
        } catch (err) {
            console.error("Error al cargar datos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const toggleAvailability = async (carId, currentStatus) => {
        try {
            const res = await fetch(`http://localhost:8080/api/cars/update-availability/${carId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ available: !currentStatus })
            });

            if (res.ok) {
                setCars(prev => prev.map(c => c.id === carId ? { ...c, available: !currentStatus } : c));
            }
        } catch (err) {
            alert("Error al actualizar estado del vehículo");
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        try {
            const res = await fetch("http://localhost:8080/api/categories/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCategory })
            });
            if (res.ok) {
                setNewCategory("");
                fetchData();
            }
        } catch (err) {
            alert("Error al crear categoría");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("¿Eliminar esta categoría? Los vehículos asociados pasarán a ser 'Sin Categoría'.")) {
            try {
                const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    fetchData(); // Recargamos para ver los cambios
                } else {
                    alert("Error al eliminar la categoría");
                }
            } catch (err) {
                console.error("Error:", err);
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/users/delete/${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    alert("Usuario eliminado");
                    fetchData();
                }
            } catch (err) {
                alert("Error al conectar con el servidor");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black pt-28 px-10 text-white pb-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-gray-900/50 p-8 rounded-3xl border border-white/5">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">
                        System <span className="text-red-700 underline decoration-red-700/50">Admin</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Control total de usuarios y flota Redline</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Estado Servidor</p>
                    <p className={`font-mono text-sm animate-pulse ${loading ? 'text-yellow-500' : 'text-green-500'}`}>
                        ● {loading ? 'SYNCING' : 'ONLINE'}
                    </p>
                </div>
            </div>

            {/* Fila de Gestión Superior (Categorías) */}
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-900 p-6 rounded-3xl border border-white/10 shadow-xl h-fit">
                    <h2 className="text-red-700 font-black uppercase text-sm mb-4 tracking-widest">Añadir Categoría</h2>
                    <form onSubmit={handleAddCategory} className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Ej: Suv, Eléctrico..."
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-red-700 transition-all text-white"
                        />
                        <button type="submit" className="bg-red-700 px-5 rounded-xl font-bold hover:bg-red-600 transition-colors">+</button>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-gray-900 p-6 rounded-3xl border border-white/10 flex flex-wrap gap-3 items-center">
                    <p className="w-full text-gray-500 text-[10px] font-black uppercase mb-2 tracking-widest">Categorías en Sistema:</p>
                    {categories.map((cat) => (
                        <div key={cat.id} className="group flex items-center bg-red-700/10 border border-red-700/30 rounded-full pl-4 pr-2 py-1 transition-all hover:border-red-700">
                            <span className="text-red-700 text-xs font-bold uppercase italic mr-2">
                                {cat.name}
                            </span>
                            <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="w-5 h-5 flex items-center justify-center rounded-full bg-red-700/20 text-red-700 text-[10px] hover:bg-red-700 hover:text-white transition-colors"
                                title="Eliminar categoría"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECCIÓN: ESTADO DE FLOTA */}
            <div className="mb-12">
                <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-700 inline-block"></span>
                    Estado de Flota
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-gray-900 border border-white/5 p-5 rounded-3xl flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-base uppercase leading-tight">{car.name}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{car.brand}</p>
                                </div>
                                <span className={`text-[9px] font-black px-2 py-1 rounded-md ${car.available ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {car.available ? 'ACTIVO' : 'EN TALLER'}
                                </span>
                            </div>

                            <button
                                onClick={() => toggleAvailability(car.id, car.available)}
                                className={`w-full py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter ${car.available
                                        ? 'bg-gray-800 text-gray-400 hover:bg-red-700/20 hover:text-red-500 border border-white/5'
                                        : 'bg-green-700 text-white hover:bg-green-600 shadow-[0_0_15px_rgba(21,128,61,0.3)]'
                                    }`}
                            >
                                {car.available ? 'Marcar No Disponible' : 'Habilitar Vehículo'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="p-6 border-b border-white/5">
                    <h2 className="font-black uppercase tracking-widest text-sm">Directorio de Usuarios</h2>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-red-700 text-white uppercase text-[10px] font-black tracking-widest">
                            <th className="p-4">ID</th>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Rango</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-white/5 transition-all text-sm">
                                <td className="p-4 text-gray-500 font-mono text-xs">#{u.id}</td>
                                <td className="p-4 font-bold">{u.name}</td>
                                <td className="p-4 text-gray-400 italic text-xs">{u.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[9px] font-black ${u.role === 'ADMIN' ? 'bg-red-700/20 text-red-500 border border-red-700/30' : 'bg-gray-800 text-gray-500'}`}>
                                        {u.role || 'USER'}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    {u.id !== currentUser?.id ? (
                                        <button onClick={() => handleDeleteUser(u.id)} className="bg-red-700/10 text-red-700 hover:bg-red-700 hover:text-white px-3 py-1 rounded-lg text-[10px] font-bold transition-all border border-red-700/20">ELIMINAR</button>
                                    ) : (
                                        <span className="text-gray-600 text-[10px] font-bold italic uppercase">Owner</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;