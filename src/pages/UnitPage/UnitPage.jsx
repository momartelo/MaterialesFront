import styles from "./UnitPage.module.css"
import Navbar from "../../components/Navbar/Navbar"
import { fetchUnitsWithoutAuth } from "../../functions/getUnit"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import Item from "antd/es/list/Item"


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
                <Item getUnit={getUnit} units={units} />
            </main>
        </div>
    )
}

export default UnitPage