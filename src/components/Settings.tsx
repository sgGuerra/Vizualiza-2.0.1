import React, { useState } from 'react';
import { Volume2, Clock, List, X } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    velocidadLectura: 1,
    volumen: 50,
    nivelDetalle: 'normal',
    objetosPersonales: ['llaves', 'teléfono', 'billetera'],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleObjetosPersonalesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const objetos = e.target.value.split(',').map(item => item.trim());
    setSettings({ ...settings, objetosPersonales: objetos });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Configuración</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="velocidadLectura" className="block mb-2">
          <Clock className="inline-block mr-2" />
          Velocidad de lectura:
        </label>
        <input
          type="range"
          id="velocidadLectura"
          name="velocidadLectura"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.velocidadLectura}
          onChange={handleInputChange}
          className="w-full"
        />
        <span>{settings.velocidadLectura}x</span>
      </div>
      <div className="mb-4">
        <label htmlFor="volumen" className="block mb-2">
          <Volume2 className="inline-block mr-2" />
          Volumen:
        </label>
        <input
          type="range"
          id="volumen"
          name="volumen"
          min="0"
          max="100"
          value={settings.volumen}
          onChange={handleInputChange}
          className="w-full"
        />
        <span>{settings.volumen}%</span>
      </div>
      <div className="mb-4">
        <label htmlFor="nivelDetalle" className="block mb-2">
          <List className="inline-block mr-2" />
          Nivel de detalle:
        </label>
        <select
          id="nivelDetalle"
          name="nivelDetalle"
          value={settings.nivelDetalle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="bajo">Bajo</option>
          <option value="normal">Normal</option>
          <option value="alto">Alto</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="objetosPersonales" className="block mb-2">
          Objetos personales importantes:
        </label>
        <textarea
          id="objetosPersonales"
          value={settings.objetosPersonales.join(', ')}
          onChange={handleObjetosPersonalesChange}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Ingrese objetos separados por comas"
        />
      </div>
      <button
        onClick={onClose}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default Settings;