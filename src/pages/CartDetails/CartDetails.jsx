import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const CartDetails = () => {
  const { user } = useContext(AuthContext);
  const [cartDetails, setCartDetails] = useState([]);
  const axiosSecure = useAxiosSecure();

  const getBookings = () => {
    axiosSecure.get(`/bookings/?email=${user?.email}`).then((data) => {
      setCartDetails(data?.data);
    });
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div className="pb-10">
      <h1 className="text-center text-3xl font-bold py-10">Cart Details</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Delete</th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((cartDetail) => {
              const { _id, img, service, date, price } = cartDetail;
              const handleDelete = (id) => {
                const proceed = confirm("Are you sure! It will be deleted permanently");
                if (proceed) {
                  axios.delete(`http://localhost:5000/bookings/${id}`).then((data) => {
                    console.log(data.data);
                    // const remaining = cartDetails.filter((cartDetail) => cartDetail._id !== id);
                    // setCartDetails(remaining);
                    if (data.data?.deletedCount) {
                      alert("Deleted Successfully");
                      getBookings();
                    }
                  });
                }
              };

              const handleConfirm = (id) => {
                axios.patch(`http://localhost:5000/bookings/${id}`, { status: "Confirmed" }).then((data) => {
                  console.log(data.data);
                  if (data.data.modifiedCount) {
                    const remaining = cartDetails.filter((cartDetail) => cartDetail._id !== id);
                    const updated = cartDetails.find((cartDetail) => cartDetail._id === id);
                    updated.status = "Confirmed";
                    setCartDetails([updated, ...remaining]);
                    // getBookings();
                  }
                });
              };
              return (
                <tr key={_id}>
                  <th>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">{img && <img src={img} />}</div>
                      </div>
                    </div>
                  </td>
                  <td>{service}</td>
                  <td>{date}</td>
                  <td>{price}</td>
                  <th>
                    {cartDetail?.status ? (
                      <span className="font-bold text-primary">Confirmed</span>
                    ) : (
                      <button onClick={() => handleConfirm(_id)} className="btn btn-ghost btn-xs">
                        Confirm
                      </button>
                    )}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartDetails;
