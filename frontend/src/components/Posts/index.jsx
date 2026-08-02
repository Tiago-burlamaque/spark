import { CiHeart } from "react-icons/ci";

function Posts({ conteudo, imagem }) {
  return (
    <div className="h-full w-100 border-2 rounded-2xl">
      <div className="border-b h-50">
        <img
          src={`http://localhost:3000/uploads/${imagem}`}
          alt="Post"
        />
      </div>

      <div className="h-10 p-2">
        <CiHeart className="text-4xl cursor-pointer" />
      </div>

      <div className="p-2 text-white">
        <h2>{conteudo}</h2>
      </div>
    </div>
  );
}

export default Posts;