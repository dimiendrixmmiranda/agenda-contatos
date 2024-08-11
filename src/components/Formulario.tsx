import { FormEvent } from "react";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { InputMask } from 'primereact/inputmask';

interface FormularioProps {
    nome: string;
    email: string;
    telefone: string;
    observacoes: string;
    atualizarBotao: boolean;
    setNome: (nome: string) => void;
    setEmail: (email: string) => void;
    setTelefone: (telefone: string) => void;
    setObservacoes: (observacoes: string) => void;
    alterarContato: () => void;
    gravar: (event: FormEvent) => void;
}

export default function Formulario(props: FormularioProps) {
    return (
        <div style={{ backgroundColor: '#03346E', width: '95%', maxWidth: '420px', minHeight: '370px' }} className="flex flex-col p-5">
            <div style={{height: '50px'}} className="flex items-center justify-center gap-1">
                <img src="icone-contatos.png" alt="icone de contatos" className="h-full"/>
                <p  style={{whiteSpace: 'nowrap'}} className="font-bold text-3xl text-white lg:text-4xl">Novo Contato</p>
            </div>
            <form className="flex flex-col gap-4 h-fit mt-4">
                <input
                    value={props.nome}
                    className="px-2 py-1 rounded-sm"
                    type="text"
                    placeholder="Nome..."
                    onChange={(event) => props.setNome(event.target.value)}
                    required
                    minLength={2}
                    maxLength={30}
                />

                <input
                    value={props.email}
                    className="px-2 py-1 rounded-sm"
                    type="email"
                    placeholder="Email..."
                    onChange={(event) => props.setEmail(event.target.value)}
                    required
                    minLength={4}
                />

                <InputMask value={props.telefone} onChange={(e) => props.setTelefone(`${e.target.value}`)} mask="(99) 9 9999-9999" placeholder="(99) 9 9999-9999" className="px-2 py-1 rounded-sm" required />

                <textarea
                    value={props.observacoes}
                    className="px-2 py-1 rounded-sm"
                    placeholder="Observações"
                    onChange={(event) => props.setObservacoes(event.target.value)}
                    maxLength={40}
                />

                {
                    props.atualizarBotao ?
                        <button
                            style={{ backgroundColor: '#FF8343' }}
                            className="py-2 text-2xl font-bold rounded-sm text-white"
                            type="button"
                            onClick={props.alterarContato}
                        >
                            Alterar
                        </button>
                        :
                        <button
                            style={{ backgroundColor: '#FF8343' }}
                            className="py-2 text-2xl font-bold rounded-sm text-white"
                            type="button"
                            onClick={props.gravar}
                        >
                            Salvar
                        </button>
                }
            </form>
        </div>
    );
}
