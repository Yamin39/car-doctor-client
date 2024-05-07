import img5 from "../../../assets/images/banner/5.jpg";

const Banner = () => {
  return (
    <div className="hero my-10 rounded-2xl" style={{ backgroundImage: `url(${img5})` }}>
      <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md py-10">
          <h1 className="mb-5 text-5xl font-bold">Affordable Price For Car Servicing</h1>
          <p className="mb-5">There are many variations of passages of available, but the majority have suffered alteration in some form</p>
          <button className="btn btn-error text-white mr-6">Discover More</button>
          <button className="btn border-white text-white btn-outline">Latest Project</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
