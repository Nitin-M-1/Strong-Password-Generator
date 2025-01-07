import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberStatus, setNumberStatus] = useState(false);
  const [charStatus, setCharStatus] = useState(false);
  const [password, setPassword] = useState("");

  //use Ref Hook 
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    const numbers = "0123456789";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let charactersNumbers = characters;

    if (numberStatus) charactersNumbers += numbers;
    if (charStatus) charactersNumbers += "!@#$%^&*()_+[]|><?.";

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      newPassword += charactersNumbers.charAt(
        Math.floor(Math.random() * charactersNumbers.length)
      );
    }
    console.log(newPassword);
    

    setPassword(newPassword);
  }, [length, numberStatus, charStatus, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>
    {
      passwordRef.current?.select();
      
      passwordRef.current?.setSelectionRange(0,9);

      window.navigator.clipboard.writeText(passwordRef.current.value);


    }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberStatus, charStatus, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto p-5 shadow-sm rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h5 className="text-center text-lg bg-none m-3">Password Generator</h5>
      <div className="flex shadow rounded-lg overflow-auto mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-5  font-bold bg-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className="px-3 bg-blue-800 text-white">Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
            id="range"
          />
          <label htmlFor="range">Length {length}</label>

          <input
            type="checkbox"
            className="p-4 ml-2"
            checked={numberStatus}
            onChange={() => {
              setNumberStatus((prev) => !prev);
            }}
            id="numberInput"
          />
          <label htmlFor="numberInput">Numbers</label>

          <input
            type="checkbox"
            className="p-4 ml-2"
            checked={charStatus}
            onChange={() => {
              setCharStatus((prev) => !prev);
            }}
            id="charInput"
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;