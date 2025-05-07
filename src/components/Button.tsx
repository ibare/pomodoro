import clsx from "clsx";

interface ButtonProps {
  label: string;
  type?: 'default' | 'text' | null;
  click: () => void;
}

const Button = ({ label, type = 'default', click }: ButtonProps) => {
  return (
    <button className={clsx(
        'flex items-center justify-center',
        {
          'w-full bg-white text-black p-5 m-2 rounded-full shadow-md text-lg hover:shadow-lg transition': type === 'default',
          'text-gray-500 text-sm p-2 m-2': type === 'text',
        }
      )} onClick={click}>
      <span className="font-medium">{ label }</span>
    </button>
  )
}

export default Button;
