import { Logo, TextMD } from "../texts";

export default function Navbar() {
  // const [price, setPrice] = useState(0);

  return (
    <div className="flex gap-4 w-full p-4">
      <div>
        <Logo />
      </div>
      <button>
        <TextMD>Charge Data</TextMD>
      </button>
      <button>
        <TextMD>Extrair dados</TextMD>
      </button>
      <button>
        <TextMD>Assinar Premium</TextMD>
      </button>
      <button>
        <TextMD>Configuracao</TextMD>
      </button>
    </div>
  );
}
