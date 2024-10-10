import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Page Not Found!</h1>
      <Link to="/">Back to the main Page</Link>
    </div>
  )
}

export default NotFound;