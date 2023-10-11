import React from 'react'

type InfoModalProps = {
    infoModal: boolean;
    createdLayer: any;
    closeModal: () => void;
  };


const UserViewIInfoModal: React.FC<InfoModalProps> = ({
    infoModal,
    createdLayer,
    closeModal,
  }) => {
    if (!infoModal) {
        return null;
      }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
    <div className="fixed inset-0 flex items-center justify-center z-[10000]">
      <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
        <p className="text-red-600">
          {createdLayer?.feature?.properties?.name}
        </p>
        <img
          src={createdLayer?.feature?.properties?.image || ""}
          alt={createdLayer?.feature?.properties?.name}
          width="100"
        />
        <p>{createdLayer?.feature?.properties?.details || ""}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
    </div>
  )
}

export default UserViewIInfoModal