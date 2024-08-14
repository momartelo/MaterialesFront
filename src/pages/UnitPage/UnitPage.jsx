import styles from "./UnitPage.module.css"
import Navbar from "../../components/Navbar/Navbar"
import { fetchUnitsWithoutAuth } from "../../functions/getUnit"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Unit from "../../components/Unit/Unit"


const UnitPage = () => {
    const [units, setUnits] = useState([]);
    const {auth} = useContext(AuthContext);
    const getUnit = useCallback(() => {
        fetchUnitsWithoutAuth()
        .then((data) => setUnits(data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() =>{
        getUnit();
    }, [getUnit]);

    return (
        <div className={styles.containerUnitPage}>
            <Navbar/>
            <div className={styles.containerTitle}>
                <img src="../../../public/img/categoria.png" alt="" />
                <h2>Unidades</h2>
            </div>
            <main className={styles.main}>
                <Unit getUnit={getUnit} units={units} />
            </main>
        </div>
    )
}

export default UnitPage