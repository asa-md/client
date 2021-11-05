export default function Title({ type = 'h2', children }) {
    return (
        <div className="container-md">
            <div className="row">
                {type === 'h1' && (
                    <div className="col-xxl-6 col-xl-8 col-lg-10 col-md-11">
                        <h1 className="title">{children}</h1>
                    </div>
                )}
                {type === 'h2' && (
                    <div className="col-xxl-6 col-xl-8 col-lg-10 col-md-11">
                        <h2 className="title">{children}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
