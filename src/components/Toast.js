import { useState, useEffect } from "react";

const Toast = ({ message, show, setShow, success }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => {
        setShow(false);
        setVisible(false);
      }, 3000); // 3000 milliseconds (3 seconds)
    }
  }, [show, setShow]);

  const backgroundColor = success ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-3 right-2 p-4 text-white transform ${backgroundColor} ${
        visible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      {message}
    </div>
  );
};

export default Toast;
