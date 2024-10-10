import React, { useState } from 'react';
import { User, Calendar, Heart } from 'lucide-react';

interface RegistrationProps {
  onComplete: (name: string) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    estadoCivil: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(userData.nombre);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2">
                <User className="inline-block mr-2" />
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellido" className="block mb-2">
                <User className="inline-block mr-2" />
                Apellido:
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <div className="mb-4">
            <label htmlFor="fechaNacimiento" className="block mb-2">
              <Calendar className="inline-block mr-2" />
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={userData.fechaNacimiento}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="mb-4">
            <label htmlFor="estadoCivil" className="block mb-2">
              <Heart className="inline-block mr-2" />
              Estado civil:
            </label>
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={userData.estadoCivil}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {renderStep()}
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {step < 3 ? 'Siguiente' : 'Completar registro'}
        </button>
      </form>
    </div>
  );
};

export default Registration;