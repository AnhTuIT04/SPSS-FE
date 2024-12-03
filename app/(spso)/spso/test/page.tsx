'use client';

import * as React from 'react';
import { useEdgeStore as useEdgeStoreFile } from '@/lib/edgestorefile';
import Link from 'next/link';

export default function Page() {
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStoreFile();
    const [url, setUrl] = React.useState<string>();
    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <button
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                // you can use this to show a progress bar
                                console.log(progress);
                            },
                        });
                        setUrl(res.url);
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        console.log(res);
                    }
                }}
            >
                Upload
            </button>
            {url && <Link href={url} target="_blank">URL</Link>}
        </div>
    );
}