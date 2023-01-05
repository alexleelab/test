import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const currentPath = location.pathname;
    return (
      <>
        <h1>
          Collaborative note for new edge<br></br>
          Coverting pdf to markdown
        </h1>
      </>
    );
}