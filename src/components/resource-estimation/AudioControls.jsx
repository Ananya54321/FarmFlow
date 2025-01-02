import React from "react";
import { FaVolumeUp, FaStop } from "react-icons/fa";

const AudioControls = ({
  isSpeaking,
  readAloud,
  stopSpeaking,
  error,
  estimationResult,
  activeTab,
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
    <h3 className="font-bold text-lg mb-2">Audio Options</h3>
    <div className="flex items-center gap-4">
      <button
        onClick={isSpeaking ? stopSpeaking : readAloud}
        className={`flex items-center gap-2 p-2 ${
          isSpeaking
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-md transition-colors`}
        disabled={!estimationResult[activeTab]}>
        {isSpeaking ? (
          <>
            <FaStop /> Stop Reading
          </>
        ) : (
          <>
            <FaVolumeUp /> Read Aloud
          </>
        )}
      </button>
    </div>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
);

export default AudioControls;
