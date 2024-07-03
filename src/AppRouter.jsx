import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/404Page/404Page";
import LoginForm from "./pages/LoginForm/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoutes from "./components/PrivateRoutes";
import MaterialPage from "./pages/MaterialPage/MaterialPage";
import MaterialPageFiltered from "./pages/MaterialPageFiltered/MaterialPageFiltered";
import MaterialPageBySub from "./pages/MaterialPageBySub/MaterialPageBySub";
import MaterialNew from "./pages/MaterialNew/MaterialNew";

function AppRouter() {
  return (
    <Routes>
      {/*Rutas Protegisa*/}
      <Route element={<PrivateRoutes />}>
        <Route path="/material/new" element={<MaterialNew />} />
        <Route path="/material" element={<MaterialPage />} />
        <Route
          path="/material/:categoryId"
          element={<MaterialPageFiltered />}
        />
        <Route
          path="/material/:categoryId/:subcategoryId"
          element={<MaterialPageBySub />}
        />
      </Route>
      {/*Rutas Publicas*/}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<HomePage />} /> // !TODO luego poner en privadas
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
