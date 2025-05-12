// components/ResponseViewer.tsx
type ResponseProps = {
  response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
  } | null;
};

export default function ResponseViewer({ response }: ResponseProps) {
  if (!response) {
    return (
      <div className="bg-zinc-900 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Response</h2>
        <div className="bg-zinc-800 p-2 rounded text-sm overflow-auto h-64">
          <p className="text-gray-500">No response yet.</p>
        </div>
      </div>
    );
  }

  // Parse the body content as JSON
  let parsedBody = null;
  try {
    parsedBody = JSON.parse(response.body);
  } catch (error) {
    parsedBody = response.body; // If parsing fails, show raw body
  }

  return (
    <div className="bg-zinc-900 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Response</h2>

      <div className="space-y-2">
        <div>
          <strong>Status:</strong> {response.status} - {response.statusText}
        </div>

        <div>
          <strong>Headers:</strong>
          <pre className="text-gray-500">{JSON.stringify(response.headers, null, 2)}</pre>
        </div>

        <div>
          <strong>Body:</strong>
          <pre className="text-gray-500 whitespace-pre-wrap">{JSON.stringify(parsedBody, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}



// // components/ResponseViewer.tsx
// type Props = {
//   response: {
//     status?: number;
//     statusText?: string;
//     headers?: Record<string, string>;
//     body?: string;
//   } | null;
// };

// export default function ResponseViewer({ response }: Props) {
//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow">
//       <h2 className="text-lg font-semibold mb-2">Response</h2>
//       <div className="bg-zinc-800 p-2 rounded text-sm overflow-auto h-64 whitespace-pre-wrap text-white">
//         {response ? (
//           <>
//             <div>
//               <strong>Status:</strong> {response.status} {response.statusText}
//             </div>
//             <div>
//               <strong>Headers:</strong>
//               <pre>{JSON.stringify(response.headers, null, 2)}</pre>
//             </div>
//             <div>
//               <strong>Body:</strong>
//               <pre>{response.body}</pre>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">No response yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }


// // components/ResponseViewer.tsx
// export default function ResponseViewer() {
//   return (
//     <div className="bg-zinc-900 p-4 rounded shadow">
//       <h2 className="text-lg font-semibold mb-2">Response</h2>
//       <div className="bg-zinc-800 p-2 rounded text-sm overflow-auto h-64">
//         <p className="text-gray-500">No response yet.</p>
//       </div>
//     </div>
//   );
// }
