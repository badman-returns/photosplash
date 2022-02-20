import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
const ImageView = lazy(() => import("./components/ImageView/ImageView"));

function App() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isHomePage, searchQuery]);

  return (
    <>
      <Navbar
        setIsHomePage={setIsHomePage}
        isHomePage={isHomePage}
        setSearchQuery={setSearchQuery}
        setPageNumber={setPageNumber}
      />
      <Suspense fallback={<Loader />}>
        <ImageView
          isHomePage={isHomePage}
          searchQuery={searchQuery}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </Suspense>
    </>
  );
}

export default App;
