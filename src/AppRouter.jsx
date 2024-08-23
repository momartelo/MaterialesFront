import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404Page/404Page";
import LoginForm from "./pages/LoginForm/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoutes from "./components/PrivateRoutes";
import MaterialNew from "./pages/MaterialNew/MaterialNew";
import MaterialPage2 from "./pages/MaterialPage2/MaterialPage2";
import CategoryPage2 from "./pages/CategoryPage2/CategoryPage2";
import MaterialPageFiltered2 from "./pages/MaterialPageFiltered2/MaterialPageFiltered2";
import MaterialPageBySub2 from "./pages/MaterialPageBySub2/MaterialPageBySub2";
import MaterialDescription from "./pages/MaterialDescription/MaterialDescription";
import MaterialUpdate from "./pages/MaterialUpdate/MaterialUpdate";
import SubcategoryPage from "./pages/SubcategoryPage/SubcategoryPage";
import UnitPage from "./pages/UnitPage/UnitPage";

function AppRouter() {
  return (
    <Routes>
      {/*Rutas Protegisa*/}
      <Route element={<PrivateRoutes />}>
        <Route path="/material/new" element={<MaterialNew />} />
        {/* <Route path="/category/new" element={<CategoryNew />} /> */}
        <Route path="/category" element={<CategoryPage2 />} />
        <Route path="/subcategory" element={<SubcategoryPage />} />
        <Route path="/unit" element={<UnitPage />} />
      </Route>
      {/*Rutas Publicas*/}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<HomePage />} /> // !TODO luego poner en privadas
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/material" element={<MaterialPage2 />} />
      <Route path="/material/update/:materialId" element={<MaterialUpdate />} />
      <Route path="/material/:categoryId" element={<MaterialPageFiltered2 />} />
      <Route
        path="/material/:categoryId/:subcategoryId"
        element={<MaterialPageBySub2 />}
      />
      <Route
        path="/material/description/:materialId"
        element={<MaterialDescription />}
      />
    </Routes>
  );
}

export default AppRouter;
