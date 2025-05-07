interface DescriptionTextProps {
  children: string;
}

const DescriptionText = ({ children }: DescriptionTextProps) => {
  return (
    <p className="text-xs font-thin text-gray-400 p-0 m-0">
      {children}
    </p>
  )
}

export default DescriptionText;
