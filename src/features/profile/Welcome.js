import { Link } from "react-router-dom";

const Welcome = () => {
    const content = (
        <section className="container mt-2">
            <div className="row mx-auto">
                <h1>This is home page!</h1>
                <div className="d-flex justify-content-center">                      
                    <Link to="/coursesList" className="btn btn-primary p-3">Go to the courses list</Link>
                </div>
            </div>
        </section>
    )

    return content
}

export default Welcome
