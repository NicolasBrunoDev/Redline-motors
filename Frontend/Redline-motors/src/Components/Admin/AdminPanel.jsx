import React, { useState, useEffect, useCallback } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Usamos useCallback para que la función sea estable
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Promise.all es excelente para cargar ambas listas al tiempo
            const [resUsers, resCats] = await Promise.all([
                fetch("http://localhost:8080/api/users/all"),
                fetch("http://localhost:8080/api/categories/all")
            ]);

            if (!resUsers.ok || !resCats.ok) throw new Error("Fallo en el servidor");

            const usersData = await resUsers.json();
            const catsData = await resCats.json();

            setUsers(Array.isArray(usersData) ? usersData : []);
            setCategories(Array.isArray(catsData) ? catsData : []);
        } catch (err) {
            console.error("Error al cargar datos:", err);
            setUsers([]); // Evita que se quede en loading si hay error
        } finally {
            setLoading(false);
        }
    }, []);

    // ÚNICO useEffect necesario para el montaje
    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        <div className="min-h-screen bg-black pt-28 px-10 text-white">
            {/* Header ... (se mantiene igual) */}
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

            {/* Gestión de Categorías ... (se mantiene igual) */}
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-900 p-6 rounded-3xl border border-white/10 shadow-xl">
                    <h2 className="text-red-700 font-black uppercase text-sm mb-4 tracking-widest">Añadir Categoría</h2>
                    <form onSubmit={handleAddCategory} className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Ej: Suv, Eléctrico..."
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-red-700 transition-all text-white"
                        />
                        <button type="submit" className="bg-red-700 px-5 rounded-xl font-bold hover:bg-red-600 transition-colors">
                            +
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-gray-900 p-6 rounded-3xl border border-white/10 flex flex-wrap gap-2 items-center">
                    <p className="w-full text-gray-500 text-[10px] font-black uppercase mb-2 tracking-widest">Categorías en Sistema:</p>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <span key={cat.id} className="bg-red-700/10 border border-red-700/30 text-red-700 px-4 py-1 rounded-full text-xs font-bold uppercase italic">
                                {cat.name}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-600 text-xs italic">Cargando categorías...</p>
                    )}
                </div>
            </div>

            {/* Tabla de Usuarios */}
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
                        {!loading && users.length > 0 ? (
                            users.map((u) => (
                                <tr key={u.id} className="hover:bg-white/5 transition-all">
                                    <td className="p-4 text-gray-500 font-mono text-xs">ID-{u.id}</td>
                                    <td className="p-4 font-bold">{u.name}</td>
                                    <td className="p-4 text-gray-400 italic">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-black ${u.role === 'ADMIN' ? 'bg-red-700 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                            {u.role || 'USER'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {u.id !== currentUser?.id ? (
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="bg-red-700/10 text-red-700 hover:bg-red-700 hover:text-white px-4 py-1 rounded-lg text-xs font-bold transition-all border border-red-700/20"
                                            >
                                                ELIMINAR
                                            </button>
                                        ) : (
                                            <span className="text-gray-600 text-xs italic font-medium">Tú (Protegido)</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500 italic">
                                    {loading ? "Sincronizando con Redline Database..." : "No se encontraron usuarios registrados."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;