import styles from "./Unit.module.css"
import { AuthContext } from "../../providers/AuthProvider"
import { fetchUnits } from "../../functions/getUnit"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UnitItem from "../UnitItem/UnitItem"
import UnitNewModal from "../UnitNewModal/UnitNewModal"


const Unit = ({units, getUnit}) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [filterUnits, setFilterUnits] = useState(units);
    const { auth } = useContext(AuthContext);
    const [ showUnitNewModal, setShowUnitNewModal ] = useState(false);

    const loadUnits = () => {
        fetchUnits(auth.token)
            .then((data) => {
                setFilterUnits(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() =>{
        let filtered = units.filter((unit) => {
            return unit.unit.toLowerCase().includes(search.toLowerCase());
        })
        filtered = filtered.slice().sort((a,b) => {
            return (a.unit || "").localeCompare(b.unit || "");
        });

        setFilterUnits(filtered);
    }, [search, sort, units]);

    const handleUnitNewClick = (e) => {
        e.stopPropagation();
        setShowUnitNewModal(true);
    };

    const handleCloseModal = () => {
        setShowUnitNewModal(false);
    };



  return (
    <div className={styles.containerUnit}>
        {auth ?
        <div className={styles.wrapperUnit}>
            <Link className={styles.btnSuccess} onClick={handleUnitNewClick}>
                Nueva Unidad
            </Link>
            <UnitNewModal show={showUnitNewModal} onHide={handleCloseModal} onUnitCreated={loadUnits} />
            <div className={styles.searchContainer}>
                <input type="search" className={styles.formControl} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className={styles.containerIcon}>
                    <img src="../../../public/img/lupaAzulRellena.png" alt="" />
                </div>
            </div>
        </div>
        :   <div className={styles.wrapperUnit}>
                <input type="search" className={styles.formControl} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className={styles.containerIcon}>
                    <img src="../../../public/img/lupaAzulRellena.png" alt="" />
                </div>
            </div>}
        <div className={styles.containerItem}>
            {filterUnits.map((unit) => (<UnitItem getUnit={getUnit} key={unit._id} unit={unit}/>
            ))}
        </div>
    </div>
  )
}

export default Unit