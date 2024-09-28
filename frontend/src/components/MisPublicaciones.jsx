import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';

const MisPublicaciones = () => {
  const { products, error, fetchUserProducts, updateProduct, deleteProduct, setProducts} = useContext(ProductsContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    const getUserProducts = async () => {
      if (user && user.token) { 
        try {
          await fetchUserProducts(user.token); 
        } catch (error) {
          console.error('Error al obtener las publicaciones del usuario:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUserProducts();
  }, [fetchUserProducts, user]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const publicaciones = Array.isArray(products) ? products : [];

  //Edicion del producto
  const handleEditClick = (product) => {
    setEditMode(product.id);
    setUpdatedProduct({ ...product });
    console.log('Producto seleccionado para editar:', product);
    console.log('Producto actualizado en el estado:', updatedProduct);
  };

   // Actualización del producto
   const handleUpdateProduct = async (id) => {
    try {
      if (updatedProduct.name && updatedProduct.description && updatedProduct.price) {
        const updatedFields = { 
          name: updatedProduct.name, 
          description: updatedProduct.description, 
          price: updatedProduct.price,
          category_id: updatedProduct.category_id, 
          image: updatedProduct.image
        };
        await updateProduct(id, updatedFields, user.token); 
        const updatedProducts = products.map((product) =>
          product.id === id ? { ...product, ...updatedFields } : product
        );
        setProducts(updatedProducts); 
        setEditMode(null); 
      } else {
        console.error("Por favor, completa todos los campos antes de guardar.");
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };
  
  //Eliminacion del producto
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id, user.token);
      const remainingProducts = products.filter((product) => product.id !== id);
      setProducts(remainingProducts);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => (
          <div
            key={publicacion.id}
            className="bg-gray-200 shadow-md rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <img 
              src={publicacion.image} 
              alt={publicacion.name} 
              className="w-full h-64 object-cover"  
            />
            <div className="p-4 flex flex-col justify-between h-full">
              {editMode === publicacion.id ? (
                <>
                  <input
                    type="text"
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    className="w-full mt-2 p-2 border"
                  />
                  <textarea
                    value={updatedProduct.description}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                    className="w-full mt-2 p-2 border"
                  />
                  <input
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    className="w-full mt-2 p-2 border"
                    placeholder="Precio"
                  />
                   <input
                  type="text"
                  value={updatedProduct.image} 
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                   className="w-full mt-2 p-2 border"
                  placeholder="URL de la imagen"
                  />
                  <button
                    onClick={() => handleUpdateProduct(publicacion.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Guardar Cambios
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-lg font-bold">{publicacion.name}</h1>
                  <p className="text-sm text-gray-600">{publicacion.description}</p>
                  <p className="text-sm text-gray-600 font-bold">Price: ${publicacion.price}</p>
                </>
              )}

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditClick(publicacion)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(publicacion.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay publicaciones</p>
      )}
    </div>
  );
};



export default MisPublicaciones;