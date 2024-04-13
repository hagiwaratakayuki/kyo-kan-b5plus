export function Message({ description: text }) {
    const markup = { __html: text };
    return (

        <div className="mb-3 p-4 rounded bg-white" dangerouslySetInnerHTML={markup} />


    )
} 