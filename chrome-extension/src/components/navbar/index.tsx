import { Logo, TextMD } from "../texts";

export default function Navbar() {
  // const [price, setPrice] = useState(0);

  return (
    <div className="flex gap-4 w-full p-4">
      <div>
        <Logo />
      </div>
      <div className="flex flex-row gap-4">
        <button>
          <TextMD>Exportar PDF</TextMD>
        </button>
        <button>
          <p className="text-yellow-400 p-2 font-semibold">Assinar Premium</p>
        </button>
        <button>
          <TextMD>Configuracao</TextMD>
        </button>
      </div>
    </div>
  );
}
