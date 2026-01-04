import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddCarPopup = ({ show, onClose, onCarAdded, editData }) => {
  const [categories, setCategories] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    priceDay: '',
    currency: '€',
    category: '',
    images: [],
    available: true,
    features: []
  });

  // 1. CARGA DE CATEGORÍAS (Solo cuando se abre el popup)
  useEffect(() => {
    if (show) {
      fetch("http://localhost:8080/api/categories/all")
        .then(res => res.json())
        .then(data => {
          const categoriesArray = Array.isArray(data) ? data : [];
          setCategories(categoriesArray);
        })
        .catch(err => {
          console.error("Error al traer categorías", err);
          setCategories([]);
        });
    }
  }, [show]);

  // 2. SINCRONIZACIÓN DE DATOS (Maneja Edición y Nuevo Vehículo)
  useEffect(() => {
    if (show) {
      if (editData) {
        // Aseguramos que 'features' e 'images' nunca sean undefined
        setFormData({
          ...editData,
          category: editData.category || '',
          images: editData.images || [],
          features: editData.features || [],
          // Extraemos el símbolo de moneda del string priceDay si existe
          currency: editData.priceDay?.includes('$') ? '$' : '€',
          priceDay: editData.priceDay?.replace(/[^0-9]/g, '') || ''
        });
      } else {
        setFormData({
          name: '',
          brand: '',
          priceDay: '',
          currency: '€',
          category: categories.length > 0 ? categories[0].name : '',
          images: [],
          available: true,
          features: []
        });
      }
    }
  }, [show, editData, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (featureName.trim() && featureValue.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, { name: featureName.trim(), value: featureValue.trim() }]
      }));
      setFeatureName("");
      setFeatureValue("");
    }
  };

  const removeFeature = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, index) => index !== indexToRemove)
    }));
  };

  const addImageUrl = () => {
    if (currentUrl.trim() !== "") {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, currentUrl.trim()]
      }));
      setCurrentUrl("");
    }
  };

  const removeImageUrl = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Por favor, añade al menos una imagen.");
      return;
    }

    const finalData = {
      ...formData,
      // Concatenamos precio y moneda para el backend
      priceDay: `${formData.priceDay}${formData.currency}`
    };

    const url = editData
      ? `http://localhost:8080/api/cars/update/${editData.id}`
      : "http://localhost:8080/api/cars/create";

    const method = editData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      if (response.ok) {
        alert(editData ? "¡Vehículo actualizado!" : "¡Vehículo añadido!");
        onCarAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 h-full w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 border border-red-700/50 p-8 rounded-3xl w-full max-w-md shadow-2xl max-h-[120vh] overflow-y-auto relative"
          >
            <button onClick={onClose} type="button" className="absolute top-5 right-5 text-gray-500 hover:text-red-600 text-2xl z-10">&times;</button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-tighter">
              {editData ? 'EDITAR' : 'NUEVO'} <span className="text-red-700 italic">REDLINE</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Categoría</p>

              <div className="grid grid-cols-2 gap-2 mb-2">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <button
                      key={cat.id || cat.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.name })}
                      className={`py-2 rounded-xl text-[10px] font-black transition-all border ${formData.category === cat.name
                        ? "bg-red-700 border-red-700 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-500 hover:border-red-700/50"
                        }`}
                    >
                      {cat.name?.toUpperCase()}
                    </button>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-xs text-gray-600 py-2">Sin categorías disponibles</p>
                )}
              </div>

              <input name="name" placeholder="Modelo" value={formData.name} onChange={handleChange} className="bg-gray-800 p-3 rounded-xl border border-gray-700 outline-none focus:border-red-700" required />
              <input name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} className="bg-gray-800 p-3 rounded-xl border border-gray-700 outline-none focus:border-red-700" required />

              <div className="flex bg-gray-800 rounded-xl border border-gray-700 focus-within:border-red-700 overflow-hidden">
                <input
                  name="priceDay"
                  type="number"
                  placeholder="Precio/día"
                  value={formData.priceDay}
                  onChange={handleChange}
                  className="bg-transparent p-3 flex-1 outline-none"
                  required
                />
                <div className="flex bg-black/20 border-l border-gray-700">
                  {['€', '$'].map(curr => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setFormData({ ...formData, currency: curr })}
                      className={`px-3 font-bold transition-colors ${formData.currency === curr ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* CARACTERÍSTICAS TÉCNICAS */}
              <div className="bg-black/30 p-4 rounded-2xl border border-gray-800 space-y-4">
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">
                    Nueva Característica
                  </p>

                  {/* Inputs Apilados */}
                  <div className="flex flex-col gap-2">
                    <input
                      placeholder="Nombre (ej: Motor, Color, Tracción...)"
                      value={featureName}
                      onChange={(e) => setFeatureName(e.target.value)}
                      className="w-full bg-gray-800 p-3 rounded-xl text-sm border border-gray-700 outline-none focus:border-red-700 transition-all placeholder:text-gray-600"
                    />
                    <input
                      placeholder="Valor (ej: V8 Turbo, Negro Mate, 4x4...)"
                      value={featureValue}
                      onChange={(e) => setFeatureValue(e.target.value)}
                      className="w-full bg-gray-800 p-3 rounded-xl text-sm border border-gray-700 outline-none focus:border-red-700 transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Botón de Acción Principal */}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="w-full bg-red-700/10 hover:bg-red-700 text-red-500 hover:text-white py-3 rounded-xl border border-red-700/30 hover:border-red-700 transition-all flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest group"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform">+</span>
                    Añadir a la lista
                  </button>
                </div>

                {/* Lista de características (Pills) */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {(formData.features || []).length > 0 ? (
                    (formData.features || []).map((feat, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 border border-white/10 px-3 py-2 rounded-lg flex items-center justify-between gap-3 w-full group animate-in slide-in-from-left-2 duration-200"
                      >
                        <div className="flex flex-col">
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
                            {feat.name}
                          </span>
                          <span className="text-xs text-white font-black italic">
                            {feat.value}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-gray-600 hover:text-red-600 font-bold p-1 transition-colors"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-600 italic text-center w-full py-2">
                      Sin características técnicas añadidas.
                    </p>
                  )}
                </div>
              </div>

              {/* IMAGENES */}
              <div className="bg-black/30 p-4 rounded-2xl border border-gray-800">
                <div className="flex gap-2 mb-3">
                  <input type="text" placeholder="URL de imagen..." value={currentUrl} onChange={(e) => setCurrentUrl(e.target.value)} className="flex-1 bg-gray-800 p-2 rounded-lg text-sm border border-gray-700 outline-none focus:border-red-700" />
                  <button type="button" onClick={addImageUrl} className="bg-red-700 px-4 rounded-lg font-bold hover:bg-red-600">+</button>
                </div>
                <div className="flex gap-2 overflow-x-auto py-2">
                  {(formData.images || []).map((url, index) => (
                    <div key={index} className="relative min-w-[60px] h-[60px] group">
                      <img src={url} alt="preview" className="w-full h-full object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImageUrl(index)} className="absolute -top-1 -right-1 bg-red-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">&times;</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button type="button" onClick={onClose} className="flex-1 text-gray-500 font-bold hover:text-white transition-colors uppercase text-sm">Cancelar</button>
                <button type="submit" className="flex-1 bg-red-700 py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg shadow-red-900/20 transition-all uppercase text-sm tracking-widest">
                  {editData ? 'Guardar Cambios' : 'Confirmar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddCarPopup;