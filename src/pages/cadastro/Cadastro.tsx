import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

    e.preventDefault();

    if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
      alert("Senhas não conferem e/ou possuem menos que 8 caracteres.")
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
      return;
    }

    setIsLoading(true);

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
      alert("Usuário cadastrado com sucesso!")

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`Erro ao cadastrar o usuário: ${error.response.status}`);
      } else {
        alert("Erro ao cadastrar o usuário! Verifique a conexão com a API.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate('/');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">

      <div
        className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
      >
      </div>

      <form className="flex justify-center items-center flex-col w-2/3 gap-3" onSubmit={cadastrarNovoUsuario}>
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="nome" className="text-black font-semibold">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario" className="text-black font-semibold">Usuário</label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            placeholder="Digite seu usuário (e-mail)"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto" className="text-black font-semibold">Foto</label>
          <input
            id="foto"
            name="foto"
            type="text"
            placeholder="Coloque o URL da sua foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="text-black font-semibold">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha" className="text-black font-semibold">Confirmar Senha</label>
          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Confirme a sua senha"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
          />
        </div>

        <div className="flex justify-around w-full gap-8">
          <button
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 cursor-pointer"
            type="reset"
            onClick={retornar}
          >
            Cancelar
          </button>

          <button
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center cursor-pointer"
            type="submit"
          >
            {
              isLoading ? (
                <ClipLoader
                  color="#ffffff"
                  size={24}
                />
              ) : (
                <span>Cadastrar</span>
              )
            }
          </button>
        </div>

      </form>

    </div>
  )
}

export default Cadastro