import { Contato } from "@/types/Contato";
import { FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";

interface ContatosProps {
    contatos: Contato[];
    busca: Contato[];
    estaBuscando: boolean;
    realizarBusca: (event: FormEvent) => void;
    deletarContato: (id: string) => void;
    editarContato: (contato: Contato) => void;
}

export default function Contatos(props: ContatosProps) {
    // Condicional para determinar quais contatos mostrar
    const contatosParaMostrar = props.estaBuscando
        ? props.busca
        : props.contatos;

    return (
        <div style={{ backgroundColor: '#03346E', width: '95%', maxWidth: '420px', height: '370px' }} className="flex flex-col gap-4 p-5">
            <div className="w-full">
                <input
                    onChange={(event) => props.realizarBusca(event)}
                    className="w-full py-2 px-4 rounded-lg"
                    type="text"
                    name=""
                    id=""
                    placeholder="Busca..."
                />
            </div>
            <ul style={{ overflowY: 'scroll', }} className="flex flex-col gap-2 scrollbar-thin scrollbar-thumb-orange-800 scrollbar-track-slate-900">
                {
                    contatosParaMostrar.length > 0
                        ? contatosParaMostrar.map(contato => (
                            <li key={contato.id} style={{ backgroundColor: '#FF8343', display: 'grid', gridTemplateColumns: '85% 15%' }} className="w-full py-3 px-2">
                                <div className="p-0 m-0 w-full flex flex-col justify-around">
                                    <p className="text-2xl font-bold leading-6 mb-2">{contato.nome}</p>
                                    <p style={{ wordBreak: 'break-word', fontSize: '.8em' }}>{contato.email}</p>
                                    <p >{contato.telefone}</p>
                                    {
                                        contato.observacoes ?
                                            <p style={{ height: '30px', overflowY: 'scroll' }} className="scrollbar-thin scrollbar-thumb-orange-800 scrollbar-track-slate-900">
                                                {contato.observacoes}
                                            </p>
                                            :
                                            <p style={{ height: '30px', overflowY: 'scroll' }} className="scrollbar-thin scrollbar-thumb-orange-800 scrollbar-track-slate-900">
                                                Vazio
                                            </p>
                                    }
                                </div>
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <button className="text-2xl p-3 rounded-full text-red-700 hover:bg-red-700 hover:text-white" onClick={() => props.deletarContato(contato.id)}><FaTrashAlt /></button>
                                    <button className="text-2xl p-3 rounded-full text-orange-900 hover:bg-orange-700 hover:text-white" onClick={() => props.editarContato(contato)}><LuClipboardEdit /></button>
                                </div>
                            </li>
                        ))
                        :
                        <div style={{ backgroundColor: '#FF8343'}} className="py-4">
                            <p className="font-bold text-center uppercase text-2xl text-white">Sem contatos</p>
                        </div>
                }
            </ul>
        </div>
    );
}