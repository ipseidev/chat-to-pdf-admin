// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import MainLayout from "./layouts/MainLayout";

function App() {

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const mutation = useMutation((formData) =>
    axios.post("https://thebalderz.com/process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("pdf", file);
    } else {
      formData.append("url", url);
    }

    mutation.mutate(formData);
  };


  return (
    <MainLayout>
 <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">PDF File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Or URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Envoyer
          </button>
          {mutation.isLoading && <div>Chargement...</div>}
          {mutation.isError && <div>Le pdf ne peut pas être envoyé</div>}
          {mutation.isSuccess && <div>Le pdf à été envoyé</div>}
        </div>
      </form>
    </MainLayout>
  )
}

export default App
