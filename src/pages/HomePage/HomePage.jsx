import React, { Suspense, lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";

const ImageView = lazy(() => import("../../components/ImageView/ImageView"));

function HomePage({ pageNumber, setPageNumber }) {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return (
    <>
      <Navbar pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Suspense fallback={<Loader />}>
        <ImageView pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </Suspense>
    </>
  );
}

export default HomePage;
