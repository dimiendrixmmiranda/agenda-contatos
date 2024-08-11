'use client';
import { FormEvent, useEffect, useState } from "react"
import { database } from "../../services/firebase";
import { ref, push, onValue, remove, update } from "firebase/database";
import Formulario from "@/components/Formulario";
import { Contato } from "@/types/Contato";
import Contatos from "@/components/Contatos";

export default function Home() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [busca, setBusca] = useState<Contato[]>([]);
    const [estaBuscando, setEstaBuscando] = useState(false);
    const [id, setId] = useState('')
    const [atualizarBotao, setAtualizarBotao] = useState(false) // atualizar botao de salvar / alterar

    useEffect(() => {
        // Cria a referência ao nó "contatos"
        const RefContatos = ref(database, 'contatos');

        // Define um listener para ouvir as mudanças nos dados
        onValue(RefContatos, (snapshot) => {
            const data = snapshot.val();

            // const listaContatos: {id: string, nome: string, email:string, telefone: string}[] = [];
            const listaContatos: any = [];

            // Converte o objeto de contatos em um array
            for (let id in data) {
                const obj: Contato = {
                    id: id,
                    nome: data[id].nome,
                    email: data[id].email,
                    telefone: data[id].telefone,
                    observacoes: data[id].observacoes // Adiciona o campo observacoes aqui
                }
                listaContatos.push(obj);
            }
            // Atualiza o estado com a lista de contatos
            setContatos(listaContatos);
        });

        // Limpa o listener quando o componente desmontar
        return () => {};
    }, []);

    function gravar(event: FormEvent) {
        event.preventDefault()
        // Referência ao nó "contatos" no banco de dados
        const referencia = ref(database, 'contatos');
        const novoContato = {
            nome,
            email,
            telefone,
            observacoes
        }

        push(referencia, novoContato)
            .then(() => {
                console.log("Contato gravado com sucesso!");
                // Limpar os campos após a gravação, se necessário
                setNome('');
                setEmail('');
                setTelefone('');
                setObservacoes('');
            })
            .catch((error) => {
                console.error("Erro ao gravar o contato: ", error);
            });
    }

    function realizarBusca(event: any) {
        const palavra = event.target.value
        console.log(palavra)
        if (palavra.length > 0) {
            setEstaBuscando(true)
            const dados: any[] = new Array()

            contatos?.map(contato => {
                const regra = new RegExp(event.target.value, `gi`)
                if (regra.test(contato.nome)) {
                    dados.push(contato)
                }
            })
            setBusca(dados)
        } else {
            setEstaBuscando(false)
        }
    }

    function deletar(id: string) {
        const referencia = ref(database, `contatos/${id}`);
        remove(referencia)
            .then(() => {
                console.log("Contato removido com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao remover o contato: ", error);
            });
    }

    function editarContato(contato: Contato) {
        setAtualizarBotao(true)
        setId(contato.id)
        setNome(contato.nome)
        setEmail(contato.email)
        setTelefone(contato.telefone)
        setObservacoes(contato.observacoes)
        console.log('aq')
    }

    function alterarContato() {
        const referencia = ref(database, `contatos/${id}`);

        const dadosAtualizados = {
            nome: nome,
            email: email,
            telefone: telefone,
            observacoes: observacoes,
        };

        update(referencia, dadosAtualizados)
            .then(() => {
                console.log("Contato atualizado com sucesso!");
                // Limpar os campos após a atualização, se necessário
                setNome('');
                setEmail('');
                setTelefone('');
                setObservacoes('');
            })
            .catch((error) => {
                console.error("Erro ao atualizar o contato: ", error);
            });
        setAtualizarBotao(false)
    }


    return (
        <main style={{minHeight:'100vh'}} className="flex flex-col items-center my-10 gap-5 lg:flex-row lg:justify-center lg:m-0">
            <Formulario
                nome={nome}
                email={email}
                telefone={telefone}
                observacoes={observacoes}
                atualizarBotao={atualizarBotao}
                setNome={setNome}
                setEmail={setEmail}
                setTelefone={setTelefone}
                setObservacoes={setObservacoes}
                alterarContato={alterarContato}
                gravar={gravar}
            />

            <Contatos
                realizarBusca={realizarBusca} estaBuscando={estaBuscando} contatos={contatos}
                busca={busca} deletarContato={deletar} editarContato={editarContato}
            ></Contatos>

        </main>
    )
}