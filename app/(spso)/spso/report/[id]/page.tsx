'use client'

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


const ReportIdPage = () => {
  const docs = [
    { uri: "https://i.imgur.com/Xae1MTJ.jpeg" },
  ];
  return (
    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
  )
}

export default ReportIdPage