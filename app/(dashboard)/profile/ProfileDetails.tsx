interface ProfileDetailsProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position: { top: number; left: number }
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ isOpen, onClose, children, position }) => {
  if (!isOpen) return null;
  return (
    <div
      className="w-96 bg-white text-black p-6 rounded shadow-lg"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, 0)", 
      }}
      onClick={(e) => e.stopPropagation()} 
    >
      {children}
    </div>
  );
};

export default ProfileDetails;
