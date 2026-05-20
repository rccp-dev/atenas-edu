'use client';

import React from "react";

interface Props {
    file: File | null;
    setFile: (file: File | null) => void;
}

export default function UploadBox({
    file,
    setFile,
}: Props) {

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const selectedFile =
            event.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        const formData = new FormData();

        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        console.log(result);
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-dashed p-6">

            <input
                type="file"
                onChange={handleFileChange}
            />

            {file && (
                <div className="rounded-lg bg-surface p-3">
                    <p className="font-medium">
                        {file.name}
                    </p>

                    <p className="text-sm text-secondary">
                        {(file.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            )}

        </div>
    );
}