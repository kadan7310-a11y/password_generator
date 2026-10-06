import { useState,useEffect} from "react";
import axios from "axios"
function App() {
  const [length, setLength] = useState(6);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
const[products,setProducts]=useState([]);
const[newProductInfo,setNewProductInfo]=useState({
  id:"",
  name:"",
  price:0,
  desc:"",
  imageURL:"",
});

const handleProductInfoChange=(e)=>{
  setNewProductInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
};



async function fetchProducts(){
  try{
    const productsRes=await axios.get("http://localhost:5050/products");
    setProducts(productsRes.data)
    console.log(productsRes.data);
  }
  catch(err){
    console.log(err);
  }
}
useEffect(()=>{
  fetchProducts();
},[]);

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:.,<>?/";

  function generate() {
    let chars = "";

    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      alert("Please select at least one option");
      return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      password += chars[index];
    }

    setPassword(password);
    setCopyMsg("");
  }

  function copyPassword() {
    if (!password) return;

    navigator.clipboard.writeText(password);
    setCopyMsg("Copied!");

    setTimeout(() => {
      setCopyMsg("");
    }, 2000);
  }
async function addProduct(e){
  e.preventDefault();
  try{
    await axios.post("http://localhost:5050/products",newProductInfo);
  
    alert("Successfully");

  }catch(err){}
}

async function deleteProduct(id){
  try{
    await axios.delete(`http://localhost:5050/products/${id}`);
    alert("Product Deleted")
  }catch(err){
    console.log(err);
  }
}

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
<form onSubmit={addProduct}>
<input type="text"name="id"id="id"onChange={handleProductInfoChange}/>
<input type="text"name="name"id="name"onChange={handleProductInfoChange}/>
<input type="number"name="price"id="price"onChange={handleProductInfoChange}/>
<input type="text"name="imageURL"id="imageURL"onChange={handleProductInfoChange}/>
<input type="text"name="desc"id="desc"onChange={handleProductInfoChange}/>
<button></button>
</form>













      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Password Generator
        </h2>

        {/* Password Length */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-slate-700">
              Password Length
            </label>

            <span className="font-bold text-blue-600">
              {length}
            </span>
          </div>

          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-slate-700">
              Use Uppercase (A-Z)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-slate-700">
              Use Lowercase (a-z)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-slate-700">
              Use Numbers (0-9)
            </span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-slate-700">
              Use Symbols (!@#$...)
            </span>
          </label>

        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
        >
          Generate Password
        </button>

        {/* Generated Password */}
        {password && (
          <div className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 min-w-0 border border-slate-300 rounded-lg px-3 py-3 bg-slate-50 text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={copyPassword}
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg font-medium transition duration-200"
              >
                Copy
              </button>
            </div>

            {copyMsg && (
              <p className="text-green-600 text-sm font-medium mt-2 text-center">
                {copyMsg}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;