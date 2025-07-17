const Sandbox = () => {
  return (
    <div className="items-start w-full px-4 flex justify-between">
      <div className="flex flex-row">
        <img src="image copy 2.png" className="h-15 mt-4" alt="" />
        <div className="flex justify-start mt-10">IoNYC</div>
      </div>

      <div className="flex justify-between px-4 text-sm font-medium mt-8 border border-dotted rounded p-2 w-min">
        <button className="text-nowrap pr-5">About the Process</button>
        <button className="text-nowrap pr-5">FAQs</button>
        <button className="text-nowrap">Selected Ideas</button>
      </div>

      <div className="flex justify-end mt-8 border border-dotted rounded pl-8 p-2 w-min">
        <button className="text-nowrap">The People's Money</button>
        <div className="flex flex-row p-2"></div>
        <img src="image copy.png" className="h-5" alt="" />
      </div>
    </div>
  );
};
export default Sandbox;
