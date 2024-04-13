export function Description({ description }) {
    const markup = { __html: description };
    return (

        <div className="mb-3 bg-white" dangerouslySetInnerHTML={markup} />


    )
} 