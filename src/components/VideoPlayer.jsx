import React from 'react';
import { X } from 'lucide-react';

export default function VideoPlayer({ url, title, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center">
      <div className="p-4 bg-black/90 flex justify-between items-center absolute top-0 w-full">
        <span className="text-white font-bold truncate text-sm">{title}</span>
        <button onClick={onClose} className="bg-red-600 p-2 rounded-full text-white">
          <X size={20} />
        </button>
      </div>
      <video src={url} className="w-full" controls autoPlay playsInline />
    </div>
  );
}
