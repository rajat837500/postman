"use client";
import { useEffect, useState } from "react";

// type KeyValue = { key: string; value: string };


const tabs = ["Params", "Headers", "Body"];

// export default function RequestForm() {

type KeyValue = { key: string; value: string };

type Props = {
  setResponse: (response: any) => void;
};

export default function RequestForm({ setResponse }: Props) {
  const [selectedTab, setSelectedTab] = useState("Params");
  const [url, setUrl] = useState("");
  const [params, setParams] = useState<KeyValue[]>([]);
  const [headers, setHeaders] = useState<KeyValue[]>([{ key: "", value: "" }]);
  const [manualEdit, setManualEdit] = useState(false);

  // Parse query params from URL
  useEffect(() => {
    try {
      const parsed = new URL(url);
      const newParams: KeyValue[] = [];
      parsed.searchParams.forEach((value, key) => {
        newParams.push({ key, value });
      });
      if (!manualEdit) {
        setParams(newParams.length ? newParams : [{ key: "", value: "" }]);
      }
    } catch {
      // Invalid URL, skip
    }
  }, [url, manualEdit]);

  // Update URL when params change
  useEffect(() => {
    try {
      const base = url.split("?")[0];
      const sp = new URLSearchParams();
      params.forEach(({ key, value }) => {
        if (key.trim()) sp.append(key.trim(), value);
      });
      const finalUrl = `${base}${sp.toString() ? `?${sp.toString()}` : ""}`;
      setUrl(finalUrl);
    } catch {
      // Skip
    }
  }, [params]);

  const handleParamChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...params];
    updated[index][field] = value;
    setParams(updated);
    setManualEdit(true);
  };

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
    setManualEdit(true);
  };

  const removeParam = (index: number) => {
    const updated = params.filter((_, i) => i !== index);
    setParams(updated);
    setManualEdit(true);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const updated = headers.filter((_, i) => i !== index);
    setHeaders(updated);
  };

  const sendRequest = async () => {
  try {
    const method = (document.querySelector("select") as HTMLSelectElement).value;
    const headerObj: Record<string, string> = {};
    headers.forEach(({ key, value }) => {
      if (key.trim()) headerObj[key.trim()] = value;
    });

    const requestBody = {
      url,
      method,
      headers: headerObj,
      body: method !== "GET" && method !== "HEAD" ? "{}" : null, // Placeholder
    };

    const res = await fetch("/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();

    setResponse({
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      body: JSON.stringify(data, null, 2),
    });
  } catch (err: any) {
    console.error("Request failed:", err);
    setResponse({
      status: 500,
      statusText: "Request Failed",
      headers: {},
      body: err.message || "Unknown error",
    });
  }
};


//   const sendRequest = async () => {
//   try {
//     const method = (document.querySelector("select") as HTMLSelectElement).value;
//     const headerObj: Record<string, string> = {};
//     headers.forEach(({ key, value }) => {
//       if (key.trim()) headerObj[key.trim()] = value;
//     });

//     const requestBody = {
//       url,
//       method,
//       headers: headerObj,
//       body: method !== "GET" && method !== "HEAD" ? "{}" : null, // Placeholder
//     };

//     const res = await fetch("/api/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await res.json();
//     console.log("Response:", data);

//     // 🔥 Send response to parent component
//     setResponse({
//       status: res.status,
//       statusText: res.statusText,
//       headers: Object.fromEntries(res.headers.entries()),
//       body: JSON.stringify(data, null, 2),
//     });
//   } catch (err: any) {
//     console.error("Request failed:", err);
//     setResponse({
//       status: 500,
//       statusText: "Request Failed",
//       headers: {},
//       body: err.message || "Unknown error",
//     });
//   }
// };


//   const sendRequest = async () => {
//   try {
//     const method = (document.querySelector("select") as HTMLSelectElement).value;
//     const headerObj: Record<string, string> = {};
//     headers.forEach(({ key, value }) => {
//       if (key.trim()) headerObj[key.trim()] = value;
//     });

//     const requestBody = {
//       url,
//       method,
//       headers: headerObj,
//       body: method !== "GET" && method !== "HEAD" ? "{}" : null, // Placeholder for now
//     };

//     const res = await fetch("/api/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await res.json();
//     console.log("Response:", data);
//   } catch (err) {
//     console.error("Request failed:", err);
//   }
// };


  // const sendRequest = async () => {
  //   try {
  //     const method = (document.querySelector("select") as HTMLSelectElement).value;
  //     const headerObj: Record<string, string> = {};
  //     headers.forEach(({ key, value }) => {
  //       if (key.trim()) headerObj[key.trim()] = value;
  //     });

  //     const options: RequestInit = {
  //       method,
  //       headers: headerObj,
  //     };

  //     const res = await fetch(url, options);
  //     const data = await res.text();
  //     console.log("Response:", data);
  //   } catch (err) {
  //     console.error("Request failed:", err);
  //   }
  // };

  return (
    <div className="bg-zinc-900 p-4 rounded shadow text-white">
      {/* Method, URL and Send */}
      <div className="flex items-center space-x-2 mb-4">
        <select className="border px-2 py-1 rounded bg-zinc-900">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setManualEdit(false);
          }}
          placeholder="https://api.example.com/resource?foo=1"
          className="flex-1 border px-2 py-1 rounded bg-zinc-800 text-white"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={sendRequest}>
          Send
        </button>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px border-b-2 ${
              selectedTab === tab
                ? "border-blue-500 text-blue-500 font-semibold"
                : "border-transparent text-gray-400"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === "Params" && (
        <div className="space-y-2">
          {params.map((pair, index) => (
            <div key={index} className="flex space-x-2">
              <input
                placeholder="Key"
                className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
                value={pair.key}
                onChange={(e) => handleParamChange(index, "key", e.target.value)}
              />
              <input
                placeholder="Value"
                className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
                value={pair.value}
                onChange={(e) => handleParamChange(index, "value", e.target.value)}
              />
              <button
                className="text-red-500 px-2"
                onClick={() => removeParam(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button className="text-sm text-blue-400 mt-2" onClick={addParam}>
            + Add Param
          </button>
        </div>
      )}

      {selectedTab === "Headers" && (
        <div className="space-y-2">
          {headers.map((pair, index) => (
            <div key={index} className="flex space-x-2">
              <input
                placeholder="Header"
                className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
                value={pair.key}
                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
              />
              <input
                placeholder="Value"
                className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
                value={pair.value}
                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
              />
              <button
                className="text-red-500 px-2"
                onClick={() => removeHeader(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button className="text-sm text-blue-400 mt-2" onClick={addHeader}>
            + Add Header
          </button>
        </div>
      )}

      {selectedTab === "Body" && (
        <textarea
          className="w-full border p-2 rounded bg-zinc-800 text-white"
          rows={6}
          placeholder="Request Body (JSON)"
        />
      )}
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";

// type KeyValue = { key: string; value: string };

// const tabs = ["Params", "Body"];

// export default function RequestForm() {
//   const [selectedTab, setSelectedTab] = useState("Params");
//   const [url, setUrl] = useState("");
//   const [params, setParams] = useState<KeyValue[]>([]);
//   const [manualEdit, setManualEdit] = useState(false);

//   // Parse query params from URL
//   useEffect(() => {
//     try {
//       const parsed = new URL(url);
//       const newParams: KeyValue[] = [];
//       parsed.searchParams.forEach((value, key) => {
//         newParams.push({ key, value });
//       });
//       if (!manualEdit) {
//         setParams(newParams.length ? newParams : [{ key: "", value: "" }]);
//       }
//     } catch {
//       // Invalid URL, skip
//     }
//   }, [url, manualEdit]);

//   // Update URL when params change
//   useEffect(() => {
//     try {
//       const base = url.split("?")[0];
//       const sp = new URLSearchParams();
//       params.forEach(({ key, value }) => {
//         if (key.trim()) sp.append(key.trim(), value);
//       });
//       const finalUrl = `${base}${sp.toString() ? `?${sp.toString()}` : ""}`;
//       setUrl(finalUrl);
//     } catch {
//       // Skip
//     }
//   }, [params]);

//   const handleParamChange = (index: number, field: "key" | "value", value: string) => {
//     const updated = [...params];
//     updated[index][field] = value;
//     setParams(updated);
//     setManualEdit(true);
//   };

//   const addParam = () => {
//     setParams([...params, { key: "", value: "" }]);
//     setManualEdit(true);
//   };

//   const removeParam = (index: number) => {
//     const updated = params.filter((_, i) => i !== index);
//     setParams(updated);
//     setManualEdit(true);
//   };

//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow text-white">
//       {/* Method, URL and Send */}
//       <div className="flex items-center space-x-2 mb-4">
//         <select className="border px-2 py-1 rounded bg-zinc-900">
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => {
//             setUrl(e.target.value);
//             setManualEdit(false);
//           }}
//           placeholder="https://api.example.com/resource?foo=1"
//           className="flex-1 border px-2 py-1 rounded bg-zinc-800 text-white"
//         />
//         <button className="bg-blue-500 text-white px-4 py-1 rounded">
//           Send
//         </button>
//       </div>

//       {/* Tab Selector */}
//       <div className="flex border-b mb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-4 py-2 -mb-px border-b-2 ${
//               selectedTab === tab
//                 ? "border-blue-500 text-blue-500 font-semibold"
//                 : "border-transparent text-gray-400"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {selectedTab === "Params" && (
//         <div className="space-y-2">
//           {params.map((pair, index) => (
//             <div key={index} className="flex space-x-2">
//               <input
//                 placeholder="Key"
//                 className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
//                 value={pair.key}
//                 onChange={(e) => handleParamChange(index, "key", e.target.value)}
//               />
//               <input
//                 placeholder="Value"
//                 className="w-1/2 border px-2 py-1 rounded bg-zinc-800 text-white"
//                 value={pair.value}
//                 onChange={(e) => handleParamChange(index, "value", e.target.value)}
//               />
//               <button
//                 className="text-red-500 px-2"
//                 onClick={() => removeParam(index)}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-sm text-blue-400 mt-2"
//             onClick={addParam}
//           >
//             + Add Param
//           </button>
//         </div>
//       )}

//       {selectedTab === "Body" && (
//         <textarea
//           className="w-full border p-2 rounded bg-zinc-800 text-white"
//           rows={6}
//           placeholder="Request Body (JSON)"
//         />
//       )}
//     </div>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";

// type KeyValue = { key: string; value: string };

// export default function RequestForm() {
//   const [url, setUrl] = useState("");
//   const [params, setParams] = useState<KeyValue[]>([]);

//   // Parse URL and extract query params on initial load and when URL changes
//   useEffect(() => {
//     try {
//       const parsed = new URL(url);
//       const newParams: KeyValue[] = [];
//       parsed.searchParams.forEach((value, key) => {
//         newParams.push({ key, value });
//       });
//       setParams(newParams.length > 0 ? newParams : [{ key: "", value: "" }]);
//     } catch (err) {
//       // Invalid URL, ignore
//     }
//   }, []);

//   // Sync Params back into URL when params change
//   useEffect(() => {
//     try {
//       const baseUrl = url.split("?")[0];
//       const searchParams = new URLSearchParams();
//       params.forEach((pair) => {
//         if (pair.key.trim()) {
//           searchParams.append(pair.key.trim(), pair.value);
//         }
//       });
//       const updatedUrl = `${baseUrl}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
//       setUrl(updatedUrl);
//     } catch (err) {
//       // invalid update
//     }
//   }, [params]);

//   // Handlers
//   const handleParamChange = (index: number, field: "key" | "value", value: string) => {
//     const updated = [...params];
//     updated[index][field] = value;
//     setParams(updated);
//   };

//   const addParam = () => {
//     setParams([...params, { key: "", value: "" }]);
//   };

//   const removeParam = (index: number) => {
//     setParams(params.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow space-y-4">
//       {/* Method, URL and Send */}
//       <div className="flex items-center space-x-2">
//         <select className="border px-2 py-1 rounded">
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="https://api.example.com/resource?foo=1"
//           className="flex-1 border px-2 py-1 rounded"
//         />
//         <button className="bg-blue-500 text-white px-4 py-1 rounded">Send</button>
//       </div>

//       {/* Params */}
//       <div>
//         <h3 className="font-semibold mb-2">Params</h3>
//         <div className="space-y-2">
//           {params.map((pair, index) => (
//             <div key={index} className="flex space-x-2">
//               <input
//                 placeholder="Key"
//                 className="w-1/2 border px-2 py-1 rounded"
//                 value={pair.key}
//                 onChange={(e) => handleParamChange(index, "key", e.target.value)}
//               />
//               <input
//                 placeholder="Value"
//                 className="w-1/2 border px-2 py-1 rounded"
//                 value={pair.value}
//                 onChange={(e) => handleParamChange(index, "value", e.target.value)}
//               />
//               <button
//                 className="text-red-500 px-2"
//                 onClick={() => removeParam(index)}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-sm text-blue-600 mt-2"
//             onClick={addParam}
//           >
//             + Add Param
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";

// type KeyValue = { key: string; value: string };

// export default function RequestForm() {
//   const [url, setUrl] = useState("");
//   const [params, setParams] = useState<KeyValue[]>([]);

//   // Auto-detect query params from URL
//   useEffect(() => {
//     try {
//       const parsed = new URL(url);
//       const newParams: KeyValue[] = [];
//       parsed.searchParams.forEach((value, key) => {
//         newParams.push({ key, value });
//       });
//       setParams(newParams);
//     } catch (err) {
//       // Invalid URL — ignore
//     }
//   }, [url]);

//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow">
//       <div className="flex items-center space-x-2 mb-4">
//         <select className="border px-2 py-1 rounded">
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>
//         <input
//           type="text"
//           placeholder="https://api.example.com/resource?foo=1&bar=hello"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="flex-1 border px-2 py-1 rounded"
//         />
//         <button className="bg-blue-500 text-white px-4 py-1 rounded">
//           Send
//         </button>
//       </div>

//       <h3 className="font-semibold mb-2">Params</h3>
//       <div className="space-y-2">
//         {params.map((pair, index) => (
//           <div key={index} className="flex space-x-2">
//             <input
//               className="w-1/2 border px-2 py-1 rounded"
//               value={pair.key}
//               readOnly
//             />
//             <input
//               className="w-1/2 border px-2 py-1 rounded"
//               value={pair.value}
//               readOnly
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";

// const tabs = ["Params", "Body"];

// export default function RequestForm() {
//   const [selectedTab, setSelectedTab] = useState("Params");

//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow">
//       {/* Method, URL and Send Button */}
//       <div className="flex items-center space-x-2 mb-4">
//         <select className="border px-2 py-1 rounded bg-zinc-900">
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>
//         <input
//           type="text"
//           placeholder="https://api.example.com/resource"
//           className="flex-1 border px-2 py-1 rounded"
//         />
//         <button className="bg-blue-500 text-white px-4 py-1 rounded">
//           Send
//         </button>
//       </div>

//       {/* Tab Selector */}
//       <div className="flex border-b mb-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-4 py-2 -mb-px border-b-2 ${
//               selectedTab === tab
//                 ? "border-blue-500 text-blue-600 font-semibold"
//                 : "border-transparent text-gray-500"
//             }`}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {selectedTab === "Params" && (
//         <div className="space-y-2">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="flex space-x-2">
//               <input
//                 placeholder="Key"
//                 className="w-1/2 border px-2 py-1 rounded"
//               />
//               <input
//                 placeholder="Value"
//                 className="w-1/2 border px-2 py-1 rounded"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedTab === "Body" && (
//         <textarea
//           className="w-full border p-2 rounded"
//           rows={6}
//           placeholder="Request Body (JSON)"
//         />
//       )}
//     </div>
//   );
// }


// // components/RequestForm.tsx
// export default function RequestForm() {
//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow">
//       <div className="flex items-center space-x-2 mb-4">
//         <select className="border px-2 py-1 rounded-xl bg-zinc-900">
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>DELETE</option>
//         </select>
//         <input
//           type="text"
//           placeholder="https://api.example.com/resource"
//           className="flex-1 border px-2 py-1 rounded"
//         />
//         <button className="bg-blue-500 text-white px-4 py-1 rounded">
//           Send
//         </button>
//       </div>
//       <textarea
//         className="w-full border p-2 rounded"
//         rows={6}
//         placeholder="Request Body (JSON)"
//       />
//     </div>
//   );
// }
