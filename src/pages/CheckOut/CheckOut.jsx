import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const { _id, title, price, img } = service;
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const date = form.date.value;

    const order = {
      customerName: name,
      email,
      date,
      img,
      service: title,
      service_id: _id,
      price,
    };

    axios.post("https://car-doctor-server-pi-jet.vercel.app/bookings", order).then((data) => {
      console.log(data?.data);
      if (data?.data?.insertedId) {
        alert("Service Booked Successfully");
      }
    });
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-6 mb-10">CheckOut: {title}</h1>

      <div className="w-fit mx-auto">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block mb-2 text-sm">
                  Date
                </label>
                <input required type="date" name="date" id="date" className="input input-bordered w-full" />
              </div>
              <div>
                <label htmlFor="dueAmount" className="block mb-2 text-sm">
                  Due Amount
                </label>
                <input
                  required
                  type="text"
                  name="dueAmount"
                  id="dueAmount"
                  placeholder="Due Amount"
                  defaultValue={`$${price}`}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button className="btn btn-primary btn-block">Confirm Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
