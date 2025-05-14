"use client";
import { useState, useEffect } from "react";

const Transcription = () => {
  const [transcriptionRunning, setTranscriptionRunning] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [language, setLanguage] = useState("en-US");
  const [isHidden, setIsHidden] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const languages = [
    ["English", "en-US", "United States"],
    ["Español", "es-ES", "España"],
    ["Français", "fr-FR", "France"],
    ["Deutsch", "de-DE", "Germany"],
    ["हिन्दी", "hi-IN", "India"],
    ["اردو", "ur-PK", "Pakistan"],
    ["ਪੰਜਾਬੀ", "pa-IN", "India"],
    ["سنڌي", "sd-PK", "Pakistan"],
    ["بلوچی", "bal-IR", "Iran"],
    ["پښتو", "ps-AF", "Afghanistan"],
  ];

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognitionInstance =
        new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionInstance.continuous = true;
      recognitionInstance.maxAlternatives = 1;
      recognitionInstance.lang = language;

      recognitionInstance.onstart = () => {
        console.log("Transcription started");
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setTranscripts((prev) => [
          ...prev,
          { text: transcript, time: new Date().toLocaleTimeString() },
        ]);
      };

      recognitionInstance.onerror = (error) => {
        console.error("Transcription error:", error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("This browser does not support transcription.");
    }
  }, [language]);

  const startTranscription = () => {
    if (recognition) {
      recognition.start();
      setTranscriptionRunning(true);
    }
  };

  const stopTranscription = () => {
    if (recognition) {
      recognition.stop();
      setTranscriptionRunning(false);
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const saveTranscription = () => {
    const blob = new Blob([JSON.stringify(transcripts)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transcription-${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
      <div
        className={`relative ${
          isHidden ? "hidden" : "block"
        } p-6 max-w-lg shadow-xl rounded-lg bg-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Transcription Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Live Transcription</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePin}
              className={`text-sm text-blue-500 ${isPinned ? "font-semibold" : ""}`}
            >
              {isPinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={toggleVisibility}
              className="text-sm text-gray-500"
            >
              {isHidden ? "Show" : "Hide"} Transcription
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="my-4">
          <label
            htmlFor="language-select"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            Select Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 border-2 border-gray-300 rounded-lg w-full text-black"
          >
            {languages.map(([name, code, country]) => (
              <option key={code} value={code}>
                {name} ({country})
              </option>
            ))}
          </select>
        </div>

        {/* Start/Stop Transcription Buttons */}
        <div className="my-4 flex space-x-4">
          <button
            onClick={startTranscription}
            className={`w-full p-3 text-white rounded-lg transition duration-300 ${
              transcriptionRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={transcriptionRunning}
          >
            {transcriptionRunning
              ? "Transcription Running..."
              : "Start Transcription"}
          </button>
          <button
            onClick={stopTranscription}
            className={`w-full p-3 text-white rounded-lg transition duration-300 ${
              !transcriptionRunning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={!transcriptionRunning}
          >
            Stop Transcription
          </button>
        </div>

        {/* Save Transcription */}
        <div className="my-4">
          <button
            onClick={saveTranscription}
            className="w-full p-3 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600"
          >
            Save Transcription
          </button>
        </div>

        {/* Transcription Text */}
        <div className="my-4">
          <h2 className="text-lg font-bold">Transcription:</h2>
          <div className="max-h-60 overflow-y-auto mt-3">
            {transcripts.length > 0 ? (
              transcripts.map((transcript, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-3 my-2 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-300"
                >
                  <p className="text-gray-800">{transcript.text}</p>
                  <span className="text-sm text-gray-500">{transcript.time}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No transcription available yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcription;
