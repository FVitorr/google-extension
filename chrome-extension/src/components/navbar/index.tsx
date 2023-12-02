import { Logo, TextMD } from "../texts";

export default function Navbar() {
  // const [price, setPrice] = useState(0);

  return (
    <div className="flex gap-4 w-full p-4">
      <div>
        <Logo />
      </div>
      <div className="flex flex-row gap-4">
        {/* AQUI ESTE BOTAO DEVE CHAMAR UMA FUNCAO QUE VAI PEGAR TODO O CONTEUDO QUE ESTA ARMAZENADO NO STATE ONDE FICA O CONTEUDO DOS PRODUTOS E DEVE PASSAR ELE EM UM PDF, OU SEJA, CREIO QUE VOU TER QUE USAR UM CONTEXT */}
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
