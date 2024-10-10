import React, { useState, useEffect, useRef } from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface VoiceCommandsProps {
  userName: string;
}

const VoiceCommands: React.FC<VoiceCommandsProps> = ({ userName }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        handleCommand(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Error de reconocimiento de voz:', event.error);
        setError(`Error de reconocimiento: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Reconocimiento de voz finalizado');
        setIsListening(false);
      };
    } else {
      setError('El reconocimiento de voz no está soportado en este navegador');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setError(null);
    setIsListening(true);
    if (recognitionRef.current) {
      recognitionRef.current.start();
      console.log('Reconocimiento de voz iniciado');
    }
    speakGreeting();
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Reconocimiento de voz detenido');
    }
  };

  const handleCommand = (command: string) => {
    console.log('Comando recibido:', command);
    // TODO: Implementar acciones basadas en los comandos recibidos
  };

  const speakGreeting = () => {
    const greeting = `Hola, ¿cómo estás ${userName}? ¿En qué puedo ayudarte?`;
    const utterance = new SpeechSynthesisUtterance(greeting);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleListening}
        className={`${
          isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold py-4 px-6 rounded-full flex items-center justify-center w-24 h-24`}
      >
        {isListening ? <StopCircle size={32} /> : <Mic size={32} />}
      </button>
      <p className="mt-4 text-lg">
        {isListening ? 'Escuchando...' : 'Presiona para hablar'}
      </p>
      {transcript && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-md">
          <p className="font-semibold">Último comando:</p>
          <p>{transcript}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg max-w-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommands;