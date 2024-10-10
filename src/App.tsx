import React, { useState } from 'react';
import { Mic, Settings as SettingsIcon, Eye } from 'lucide-react';
import Registration from './components/Registration';
import Settings from './components/Settings';
import VoiceCommands from './components/VoiceCommands';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('');

  const handleRegistrationComplete = (name: string) => {
    setIsRegistered(true);
    setUserName(name);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Asistente Visual</h1>
      </header>
      <main className="flex-grow p-4">
        {!isRegistered ? (
          <Registration onComplete={handleRegistrationComplete} />
        ) : (
          <>
            {showSettings ? (
              <Settings onClose={() => setShowSettings(false)} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <VoiceCommands userName={userName} />
                <button
                  onClick={() => setShowSettings(true)}
                  className="mt-4 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  <SettingsIcon className="mr-2" />
                  Configuración
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>Desarrollado para mejorar la autonomía de personas con discapacidad visual</p>
      </footer>
    </div>
  );
}

export default App;