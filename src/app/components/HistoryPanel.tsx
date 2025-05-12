'use client';

import { useEffect, useState } from 'react';

type RequestLog = {
  id: string;
  method: string;
  url: string;
  createdAt: string;
};

export default function HistoryPanel() {
  const [logs, setLogs] = useState<RequestLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/history');
      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-zinc-900 p-4 rounded shadow h-full">
      <h2 className="text-lg font-semibold mb-2">History</h2>
      <ul className="space-y-2 max-h-[32rem] overflow-auto">
        {logs.map((log) => (
          <li key={log.id} className="border p-2 rounded hover:bg-zinc-800 cursor-pointer">
            <div className="text-sm text-zinc-400">{log.method} {log.url}</div>
            <div className="text-xs text-zinc-400">{new Date(log.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";

// type RequestLog = {
//   id: string;
//   method: string;
//   url: string;
//   createdAt: string;
// };

// export default function HistoryPanel() {
//   const [history, setHistory] = useState<RequestLog[]>([]);

//   useEffect(() => {
//     async function fetchHistory() {
//       try {
//         const res = await fetch("/api/history");
//         const data = await res.json();
//         setHistory(data);
//       } catch (err) {
//         console.error("Failed to fetch history", err);
//       }
//     }

//     fetchHistory();
//   }, []);

//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow h-full">
//       <h2 className="text-lg font-semibold mb-2">History</h2>
//       <ul className="space-y-2 max-h-[32rem] overflow-auto">
//         {history.map((log) => (
//           <li key={log.id} className="border p-2 rounded hover:bg-zinc-800 cursor-pointer">
//             <div className="text-sm text-zinc-400">{log.method} {log.url}</div>
//             <div className="text-xs text-zinc-400">{new Date(log.createdAt).toLocaleString()}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// // components/HistoryPanel.tsx
// export default function HistoryPanel() {
//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow h-full">
//       <h2 className="text-lg font-semibold mb-2">History</h2>
//       <ul className="space-y-2 max-h-[32rem] overflow-auto">
//         {Array.from({ length: 10 }).map((_, i) => (
//           <li key={i} className="border p-2 rounded hover:bg-zinc-800 cursor-pointer">
//             <div className="text-sm text-zinc-400">GET /api/example</div>
//             <div className="text-xs text-zinc-400">2025-05-09 12:34 PM</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
