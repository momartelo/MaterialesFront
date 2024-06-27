import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";

const DeleteMaterialModel = ({ materialId, getMaterial }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDelete = () => {
    console.log("delete material", materialId);
    fetch(`${API_URL}/material/${materialId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status !== 200) return alert("Error deleting material");
      ref.current.click();
      getMaterial();
    });
  };
  return (
    <div
      className="modal fade"
      id={"modal" + materialId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Delete Material
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this material?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={ref}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMaterialModel;
