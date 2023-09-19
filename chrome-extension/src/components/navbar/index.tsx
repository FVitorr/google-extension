import { Logo, TextMD } from "../texts";



export default function Navbar() {
  // const [price, setPrice] = useState(0);


  return (
    <div className="flex gap-4 w-full p-8">
      <div>
        <Logo />
      </div>
      <button>
        <TextMD>
          Charge Data
        </TextMD>
      </button>
      <button>
        Extrair dados
      </button>
    </div>
  );
}