import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import MisPublicaciones from "../components/MisPublicaciones";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // Importar useAuth

const Perfil = () => {
  const { user } = useAuth(); // Obtener datos del usuario

  useEffect(() => {
    console.log("Datos del usuario:", user);
  }, [user]); // Monitorear cambios en los datos del usuario

  return (
    <div className="flex flex-col justify-around min-h-screen">
      <NavBar />
      <main className="container bg-slate-300 rounded-lg mx-auto p-4 mt-4 flex-grow">
        <div className="flex flex-col bg-white md:flex-row">
          <section className=" p-5 mb-4 w-full md:w-1/2 flex justify-center items-center">
            <img src="/Perfil.png" alt="Logo grupo 7" className="h-[100%] w-48 rounded-full" />
          </section>
          <section className="bg-white p-4 w-full md:w-1/2">
            <form>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingrese su nombre"
                  value={user?.nombre || ""}
                  readOnly
                />
              </div>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingrese su email"
                  value={user?.email || ""}
                  readOnly
                />
              </div>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <input
                  type="tel"
                  id="telefono"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingrese su teléfono"
                  value={user?.telefono || ""}
                  readOnly
                />
              </div>
            </form>
            <div className="mt-4">
            </div>
          </section>
        </div>
              <Link to="/crear-publicacion">
                <button className="bg-blue-500 text-white px-4 py-2 mt-5 rounded">Crear Producto</button>
              </Link>
        <section className="p-4 pt-10 mb-5">
          <h2 className="mb-5 text-2xl">Mis Publicaciones</h2>
          <article className="flex flex-wrap justify-start gap-4">
            <MisPublicaciones />
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil;